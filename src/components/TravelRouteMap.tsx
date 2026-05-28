import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, PolylineF, MarkerF } from "@react-google-maps/api";
import { PlaceDetail, searchPlace } from "@/utils/googlePlaces";
import { Loader2, MapPin, ExternalLink, Star, X, ChevronLeft, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TravelRouteMapPeriod {
  key: string;
  label: string;
  title: string;
  time: string;
  place: string;
  desc: string;
}

interface TravelRouteMapProps {
  periods: TravelRouteMapPeriod[];
  province: string;
  language?: string;
  onDownload?: () => void;
  isDownloading?: boolean;
}

interface RouteItem {
  time: string;
  label: string;
  placeName: string;
  desc: string;
  placeDetail: PlaceDetail | null;
}

const defaultCenter = { lat: 37.5665, lng: 126.9780 }; // 서울 기준
const googleMapsLibraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

export const TravelRouteMap = ({ 
  periods, 
  province, 
  language = "ko",
  onDownload,
  isDownloading = false
}: TravelRouteMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: googleMapsLibraries,
    language: language
  });

  const [routeItems, setRouteItems] = useState<RouteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFailed, setSearchFailed] = useState(false);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const centerMapOnPlace = (lat: number, lng: number) => {
    if (!mapRef.current) return;
    mapRef.current.panTo({ lat, lng });
    if (window.innerWidth >= 1024) {
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.panBy(175, 0); // moves marker left to center in the visible area
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (periods.length === 0) {
      setLoading(false);
      return;
    }
    if (!isLoaded) return;

    const fetchPlaces = async () => {
      setLoading(true);
      setSearchFailed(false);
      
      const queries = periods.map(p => {
        const bracketMatch = p.place.match(/\[([^\]]+)\]/);
        let placeName = bracketMatch ? bracketMatch[1] : p.place;
        
        placeName = placeName
          .replace(/^(🌄|🍚|🌲|🌃|아침|오전|점심|오후|저녁|식사|힐링|야경|코스)[:\s\-~]+/g, "")
          .trim();
          
        return `${province} ${placeName}`;
      });

      const details: (PlaceDetail | null)[] = [];
      
      for (const query of queries) {
        if (!query.trim()) {
          details.push(null);
          continue;
        }
        try {
          await new Promise(resolve => setTimeout(resolve, 100));
          const detail = await searchPlace(query);
          details.push(detail);
        } catch (error) {
          console.warn(`"${query}" 장소의 상세 정보를 가져오는데 실패했습니다:`, error);
          details.push(null);
        }
      }

      const items: RouteItem[] = periods.map((p, idx) => ({
        time: p.time,
        label: p.label,
        placeName: p.place,
        desc: p.desc,
        placeDetail: details[idx]
      }));

      setRouteItems(items);
      setLoading(false);

      const validDetails = details.filter((d): d is PlaceDetail => d !== null);

      if (validDetails.length === 0 && periods.length > 0) {
        setSearchFailed(true);
      }

      if (validDetails.length > 0 && mapRef.current) {
        const bounds = new google.maps.LatLngBounds();
        validDetails.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
        mapRef.current.fitBounds(bounds);
        
        const listener = google.maps.event.addListener(mapRef.current, "idle", () => {
          if (mapRef.current && mapRef.current.getZoom()! > 15) {
            mapRef.current.setZoom(14);
          }
          google.maps.event.removeListener(listener);
        });
      }
    };

    fetchPlaces();
  }, [isLoaded, periods, province]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    const validDetails = routeItems
      .map(item => item.placeDetail)
      .filter((d): d is PlaceDetail => d !== null);

    if (validDetails.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      validDetails.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
      map.fitBounds(bounds);
    }
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  const handleOpenGoogleDirections = () => {
    const validDetails = routeItems
      .map(item => item.placeDetail)
      .filter((d): d is PlaceDetail => d !== null);

    if (validDetails.length === 0) return;

    const origin = validDetails[0].name;
    const destination = validDetails[validDetails.length - 1].name;
    
    let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    
    if (validDetails.length > 2) {
      const waypoints = validDetails
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

  const renderInfoPanelContent = () => {
    if (activeMarker === null) {
      return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="mb-4 shrink-0 flex items-center justify-between gap-2">
            <h4 className="font-extrabold text-slate-800 text-[15px] flex items-center gap-1.5 whitespace-nowrap">
              🗺️ {language === 'ko' ? "추천여행코스" : (language === 'en' ? "Recommended Course" : (language === 'zh' ? "推荐旅行路线" : "おすすめコース"))}
            </h4>
            <div className="flex items-center gap-1">
              {onDownload && (
                <Button
                  onClick={onDownload}
                  disabled={isDownloading}
                  className="bg-white hover:bg-slate-50 text-amber-600 border border-amber-200 hover:border-amber-300 font-extrabold text-[10px] gap-1 px-2.5 h-7 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm shrink-0 disabled:opacity-60"
                >
                  {isDownloading ? (
                    <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
                  ) : (
                    <Download className="w-3 h-3 text-amber-600" />
                  )}
                  <span>
                    {language === 'ko' && "안내지 다운"}
                    {language === 'en' && "Save Map"}
                    {language === 'zh' && "下载地图"}
                    {language === 'ja' && "マップ保存"}
                  </span>
                </Button>
              )}
              {hasValidPlaces && (
                <Button 
                  onClick={handleOpenGoogleDirections}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-[10px] gap-1 px-2.5 h-7 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm shrink-0"
                >
                  {language === 'ko' && "전체 길찾기"}
                  {language === 'en' && "Directions"}
                  {language === 'zh' && "完整导航"}
                  {language === 'ja' && "全ルート案内"}
                  <ExternalLink className="w-2.5 h-2.5" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {routeItems.map((item, index) => (
              <div 
                key={index}
                onClick={() => {
                  setActiveMarker(index);
                  if (item.placeDetail) {
                    centerMapOnPlace(item.placeDetail.lat, item.placeDetail.lng);
                  }
                }}
                className="flex gap-3.5 p-2.5 bg-slate-50 hover:bg-sky-50/80 border border-slate-100 hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5 rounded-2xl transition-all duration-200 cursor-pointer group active:scale-[0.99]"
              >
                {/* Left: Thumbnail & Number Badge */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200/50 shrink-0 bg-slate-100">
                  {item.placeDetail?.photoUrl ? (
                    <img 
                      src={item.placeDetail.photoUrl} 
                      alt={item.placeName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <MapPin className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  )}
                  <div className="absolute top-1 left-1 bg-slate-900/90 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md">
                    {index + 1}
                  </div>
                </div>
                
                {/* Right: Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <span className="text-[8.5px] font-black text-sky-600 tracking-wide bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100/50 uppercase shrink-0">
                      {item.label || `${index + 1}번째 코스`}
                    </span>
                    <h5 className="font-sans font-black text-slate-800 text-[13px] tracking-tight truncate group-hover:text-sky-600 transition-colors">
                      {item.placeName}
                    </h5>
                  </div>
                  {item.placeDetail?.rating && (
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold mt-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      <span>{item.placeDetail.rating}</span>
                      {item.placeDetail.address && (
                        <span className="text-slate-400 font-normal truncate ml-1 max-w-[120px]">
                          · {item.placeDetail.address.replace("대한민국 ", "")}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const item = routeItems[activeMarker];
    if (!item) return null;
    return (
      <div className="flex-1 flex flex-col h-full relative justify-between overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={() => setActiveMarker(null)}
          className="absolute top-0 right-0 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors active:scale-90 z-20"
          title="목록으로 돌아가기"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
        
        <div className="flex-1 overflow-y-auto pr-1 pb-3">
          {/* Thumbnail */}
          <div className="w-full h-36 rounded-2xl overflow-hidden border border-slate-200/50 bg-slate-100 mb-3 relative shadow-inner">
            {item.placeDetail?.photoUrl ? (
              <img 
                src={item.placeDetail.photoUrl} 
                alt={item.placeName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <MapPin className="w-8 h-8 stroke-[1]" />
              </div>
            )}
            <div className="absolute bottom-2.5 left-2.5 bg-sky-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md">
              {item.label || `${activeMarker + 1}번째 코스`}
            </div>
          </div>
          
          {/* Title / Rating */}
          <div className="mb-2">
            <h4 className="font-sans font-black text-slate-800 text-base tracking-tight leading-snug">
              {item.placeName}
            </h4>
            {item.placeDetail?.rating && (
              <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold mt-0.5">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{item.placeDetail.rating}</span>
                {item.placeDetail.address && (
                  <span className="text-slate-400 font-normal ml-1">
                    · {item.placeDetail.address.replace("대한민국 ", "")}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Description */}
          <div className="bg-sky-50/50 border border-sky-100/50 rounded-2xl p-3 mb-3">
            <p className="text-[8px] font-bold text-sky-600 mb-1 tracking-wider uppercase">Local Guide's Note</p>
            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
              {item.desc || "가이드 추천 코스 정보입니다."}
            </p>
          </div>
          
          {/* Address */}
          {item.placeDetail?.address && (
            <div className="text-[10px] text-slate-500 flex items-start gap-1 px-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
              <span>{item.placeDetail.address}</span>
            </div>
          )}
        </div>
        
        {/* Bottom Slider Navigation */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between mt-auto shrink-0 bg-white">
          <button
            onClick={() => {
              if (activeMarker > 0) {
                const newIndex = activeMarker - 1;
                setActiveMarker(newIndex);
                const prevItem = routeItems[newIndex];
                if (prevItem?.placeDetail) {
                  centerMapOnPlace(prevItem.placeDetail.lat, prevItem.placeDetail.lng);
                }
              }
            }}
            disabled={activeMarker === 0}
            className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          
          <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50">
            {routeItems.length}개 중 {activeMarker + 1}번째 코스
          </span>
          
          <button
            onClick={() => {
              if (activeMarker < routeItems.length - 1) {
                const newIndex = activeMarker + 1;
                setActiveMarker(newIndex);
                const nextItem = routeItems[newIndex];
                if (nextItem?.placeDetail) {
                  centerMapOnPlace(nextItem.placeDetail.lat, nextItem.placeDetail.lng);
                }
              }
            }}
            disabled={activeMarker === routeItems.length - 1}
            className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    );
  };

  if (loadError) {
    return (
      <div className="h-[470px] flex flex-col items-center justify-center bg-[#fdf2f2] border border-[#fde8e8] rounded-3xl p-6 text-center">
        <p className="text-red-600 font-bold mb-2">구글 지도를 불러오는데 실패했습니다.</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Google Maps API Key 및 결제 설정이 올바르게 완료되었는지 확인해 주시기 바랍니다.
        </p>
      </div>
    );
  }

  if (!isLoaded || loading) {
    return (
      <div className="h-[470px] flex flex-col items-center justify-center bg-muted/10 border border-dashed rounded-3xl gap-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-slate-500 font-extrabold">로컬 여행 코스 지도를 생성하는 중입니다...</p>
      </div>
    );
  }

  if (searchFailed) {
    return (
      <div className="h-[470px] flex flex-col items-center justify-center bg-[#fdf2f2] border border-[#fde8e8] rounded-3xl p-6 text-center">
        <p className="text-red-600 font-bold mb-2">추천 코스 장소 검색에 실패하여 지도를 표시할 수 없습니다.</p>
        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
          추천된 장소들의 위치 정보를 찾지 못했습니다.<br />
          Google Cloud Console에서 <strong>Places API</strong>가 활성화(Enable)되어 있는지 확인해 주세요.
        </p>
      </div>
    );
  }

  const polylinePath = routeItems
    .map(item => item.placeDetail ? { lat: item.placeDetail.lat, lng: item.placeDetail.lng } : null)
    .filter((pos): pos is { lat: number; lng: number } => pos !== null);

  const hasValidPlaces = routeItems.some(item => item.placeDetail !== null);

  return (
    <div className="space-y-4">
      {/* Relative container holding map as background and panel floating on desktop */}
      <div className="relative w-full h-[470px] lg:h-[520px] rounded-3xl overflow-hidden border border-border shadow-md bg-slate-50">
        
        {/* Google Map (Takes full space) */}
        <div className="absolute inset-0 w-full h-full z-0">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={polylinePath[0] || defaultCenter}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              zoomControl: true,
              zoomControlOptions: {
                position: window.google?.maps?.ControlPosition?.LEFT_CENTER
              }
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

            {/* Standard MarkerF with numeric label (Red map pin) */}
            {routeItems.map((item, index) => {
              if (!item.placeDetail) return null;
              return (
                <MarkerF
                  key={index}
                  position={{ lat: item.placeDetail.lat, lng: item.placeDetail.lng }}
                  label={{
                    text: (index + 1).toString(),
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                  onClick={() => {
                    setActiveMarker(index);
                    if (item.placeDetail) {
                      centerMapOnPlace(item.placeDetail.lat, item.placeDetail.lng);
                    }
                  }}
                />
              );
            })}
          </GoogleMap>
        </div>

        {/* Floating Panel (Desktop only: lg:flex) */}
        <div className="hidden lg:flex absolute top-4 right-4 bottom-4 z-10 w-[350px] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-2xl flex-col p-5 overflow-hidden">
          {renderInfoPanelContent()}
        </div>
      </div>

      {/* Mobile Stacked Layout (Mobile only: lg:hidden) */}
      <div className="lg:hidden mt-4 space-y-4">
        {/* Mobile Info Panel */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm">
          {renderInfoPanelContent()}
        </div>
      </div>
    </div>
  );
};
