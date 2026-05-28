export interface PlaceDetail {
  name: string;
  address?: string;
  lat: number;
  lng: number;
  photoUrl?: string;
  rating?: number;
  types?: string[];
}

// 메모리 기반 캐시 저장소 (동일 세션 내 중복 검색 방지)
const placeCache: Record<string, PlaceDetail> = {};

let placesService: google.maps.places.PlacesService | null = null;

/**
 * Google PlacesService 객체 취득
 * Google Maps SDK가 전역(window.google)에 로드된 이후 호출해야 합니다.
 */
export const getPlacesService = (map?: google.maps.Map): google.maps.places.PlacesService => {
  if (placesService) return placesService;
  
  if (typeof window !== 'undefined' && window.google && window.google.maps) {
    if (map) {
      placesService = new google.maps.places.PlacesService(map);
    } else {
      const dummyContainer = document.createElement('div');
      placesService = new google.maps.places.PlacesService(dummyContainer);
    }
    return placesService;
  }
  throw new Error("Google Maps SDK가 로드되지 않았거나 사용할 수 없는 상태입니다.");
};

/**
 * 검색어로 장소의 정보(좌표, 썸네일, 주소, 평점)를 단일 조회
 */
export const searchPlace = (query: string, map?: google.maps.Map): Promise<PlaceDetail> => {
  if (placeCache[query]) {
    return Promise.resolve(placeCache[query]);
  }

  return new Promise((resolve, reject) => {
    try {
      const service = getPlacesService(map);
      
      const request: google.maps.places.TextSearchRequest = {
        query: query
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          const place = results[0];
          
          // 2차 필터링: 구글 검색결과 타입 중 단순 행정구역(locality, sublocality, political) 배제
          const types = place.types || [];
          const isAdminArea = types.some(t => ['locality', 'sublocality', 'political', 'administrative_area_level_1', 'administrative_area_level_2'].includes(t)) && 
                              !types.some(t => ['establishment', 'point_of_interest', 'tourist_attraction', 'food', 'restaurant', 'cafe', 'bar', 'store', 'park', 'museum'].includes(t));
          if (isAdminArea) {
            reject(new Error(`단일 행정구역 결과(시/군/구/동 등)로 판정되어 제외되었습니다: ${query}`));
            return;
          }

          const geometry = place.geometry;
          
          if (geometry && geometry.location) {
            const photoUrl = place.photos && place.photos.length > 0 
              ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 })
              : undefined;

            const detail: PlaceDetail = {
              name: place.name || query,
              address: place.formatted_address,
              lat: geometry.location.lat(),
              lng: geometry.location.lng(),
              photoUrl,
              rating: place.rating,
              types
            };

            // 캐시 저장
            placeCache[query] = detail;
            resolve(detail);
          } else {
            reject(new Error(`장소의 좌표 정보가 존재하지 않습니다: ${query}`));
          }
        } else {
          reject(new Error(`Google Places 검색 실패 (상태코드: ${status}) - 검색어: ${query}`));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 다수의 장소명 리스트를 순차적으로 검색하여 결과를 배열로 반환
 */
export const searchPlacesList = async (queries: string[], map?: google.maps.Map): Promise<PlaceDetail[]> => {
  const results: PlaceDetail[] = [];
  for (const query of queries) {
    if (!query.trim()) continue;
    try {
      // 단기간에 너무 많은 요청을 보내 API 한도 에러(OVER_QUERY_LIMIT)가 발생하는 것을 막기 위해 미세한 딜레이를 둡니다.
      await new Promise(resolve => setTimeout(resolve, 100));
      const detail = await searchPlace(query, map);
      results.push(detail);
    } catch (error) {
      console.warn(`"${query}" 장소의 상세 정보를 가져오는데 실패했습니다:`, error);
    }
  }
  return results;
};
