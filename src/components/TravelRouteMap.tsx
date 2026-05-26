import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF, InfoWindowF } from "@react-google-maps/api";
import { PlaceDetail, searchPlacesList } from "@/utils/googlePlaces";
import { Loader2, MapPin, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TravelRouteMapProps {
  locations: string[];
  province: string;
  language?: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "20px"
};

const defaultCenter = { lat: 37.5665, lng: 126.9780 }; // 서울 기준
const googleMapsLibraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

export const TravelRouteMap = ({ locations, province, language = "ko" }: TravelRouteMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: googleMapsLibraries,
    language: language
  });

  const [placeDetails, setPlaceDetails] = useState<PlaceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFailed, setSearchFailed] = useState(false);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (locations.length === 0) {
      setLoading(false);
      return;
    }
    if (!isLoaded) return;

    const fetchPlaces = async () => {
      setLoading(true);
      setSearchFailed(false);
      
      // 검색 쿼리 정제 (예: "🌄 아침 [덕구온천]" -> "덕구온천" 만 추출하거나, 말머리를 지웁니다)
      const queries = locations.map(loc => {
        // [장소명] 대괄호 패턴이 있을 경우 최우선 추출
        const bracketMatch = loc.match(/\[([^\]]+)\]/);
        let placeName = bracketMatch ? bracketMatch[1] : loc;
        
        // 아침/점심/오후/저녁 등 머리말 제거
        placeName = placeName
          .replace(/^(🌄|🍚|🌲|🌃|아침|오전|점심|오후|저녁|식사|힐링|야경|코스)[:\s\-~]+/g, "")
          .trim();
          
        return `${province} ${placeName}`;
      });

      const details = await searchPlacesList(queries);
      setPlaceDetails(details);
      setLoading(false);

      if (details.length === 0 && locations.length > 0) {
        setSearchFailed(true);
      }

      // 지도 맞춤 범위 설정(FitBounds)
      if (details.length > 0 && mapRef.current) {
        const bounds = new google.maps.LatLngBounds();
        details.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
        mapRef.current.fitBounds(bounds);
        
        // 너무 가깝게 줌인(Zoom) 되는 현상 제어
        const listener = google.maps.event.addListener(mapRef.current, "idle", () => {
          if (mapRef.current && mapRef.current.getZoom()! > 15) {
            mapRef.current.setZoom(14);
          }
          google.maps.event.removeListener(listener);
        });
      }
    };

    fetchPlaces();
  }, [isLoaded, locations, province]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (placeDetails.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      placeDetails.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
      map.fitBounds(bounds);
    }
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  // 구글 맵 다중 경유지 길찾기 팝업
  const handleOpenGoogleDirections = () => {
    if (placeDetails.length === 0) return;

    const origin = placeDetails[0].name;
    const destination = placeDetails[placeDetails.length - 1].name;
    
    let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    
    if (placeDetails.length > 2) {
      const waypoints = placeDetails
        .slice(1, -1)
        .map(p => p.name)
        .join("|");
      url += `&waypoints=${encodeURIComponent(waypoints)}`;
    }

    const width = 1000;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(url, "googleMapsDirections", `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`);
  };

  if (loadError) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center bg-[#fdf2f2] border border-[#fde8e8] rounded-3xl p-6 text-center">
        <p className="text-red-600 font-bold mb-2">구글 지도를 불러오는데 실패했습니다.</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Google Maps API Key 및 결제 설정이 올바르게 완료되었는지 확인해 주시기 바랍니다.
        </p>
      </div>
    );
  }

  if (!isLoaded || loading) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center bg-muted/10 border border-dashed rounded-3xl gap-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-slate-500 font-extrabold">로컬 여행 코스 지도를 생성하는 중입니다...</p>
      </div>
    );
  }

  if (searchFailed) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center bg-[#fdf2f2] border border-[#fde8e8] rounded-3xl p-6 text-center">
        <p className="text-red-600 font-bold mb-2">추천 코스 장소 검색에 실패하여 지도를 표시할 수 없습니다.</p>
        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
          추천된 장소들의 위치 정보를 찾지 못했습니다.<br />
          Google Cloud Console에서 <strong>Places API</strong>가 활성화(Enable)되어 있는지 확인해 주세요.
        </p>
      </div>
    );
  }

  const polylinePath = placeDetails.map(p => ({ lat: p.lat, lng: p.lng }));

  return (
    <div className="space-y-4">
      <div className="relative rounded-3xl overflow-hidden border border-border shadow-md">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={placeDetails[0] ? { lat: placeDetails[0].lat, lng: placeDetails[0].lng } : defaultCenter}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
          }}
        >
          {/* 장소 연결 점선 그리기 */}
          {polylinePath.length > 1 && (
            <PolylineF
              path={polylinePath}
              options={{
                strokeColor: "#0ea5e9",
                strokeOpacity: 0.8,
                strokeWeight: 4,
                geodesic: true,
              }}
            />
          )}

          {/* 마커 및 상세 팝업 정보 */}
          {placeDetails.map((place, index) => (
            <React.Fragment key={index}>
              <MarkerF
                position={{ lat: place.lat, lng: place.lng }}
                label={{
                  text: (index + 1).toString(),
                  color: "#ffffff",
                  fontWeight: "900",
                  fontSize: "14px"
                }}
                onClick={() => setActiveMarker(index)}
              />

              {activeMarker === index && (
                <InfoWindowF
                  position={{ lat: place.lat, lng: place.lng }}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div className="p-2 max-w-[220px] text-slate-900 bg-white font-sans">
                    {place.photoUrl && (
                      <img 
                        src={place.photoUrl} 
                        alt={place.name} 
                        className="w-full h-24 object-cover rounded-md mb-2 shadow-sm"
                      />
                    )}
                    <h4 className="font-extrabold text-sm mb-1 text-slate-800 truncate">{place.name}</h4>
                    {place.rating && (
                      <div className="flex items-center gap-1 text-xs text-amber-500 mb-1 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{place.rating}</span>
                      </div>
                    )}
                    {place.address && (
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-2 leading-normal">{place.address}</p>
                    )}
                    <div className="flex justify-end pt-1 border-t border-slate-100">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + (place.address || ""))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-0.5"
                      >
                        지도에서 보기 <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </InfoWindowF>
              )}
            </React.Fragment>
          ))}
        </GoogleMap>
      </div>

      {placeDetails.length > 0 && (
        <div className="flex justify-between items-center bg-sky-50/50 border border-sky-100/70 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-sky-100 rounded-lg"><MapPin className="w-5 h-5 text-sky-600" /></div>
            <p className="text-xs md:text-sm text-slate-700 font-extrabold">
              로컬 가이드의 추천 명소 <span className="text-sky-600">{placeDetails.length}곳</span>의 추천 코스가 연결되었습니다.
            </p>
          </div>
          <Button 
            onClick={handleOpenGoogleDirections}
            className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs md:text-sm gap-1.5 px-4 h-10 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            추천 경로 전체 길찾기 <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
