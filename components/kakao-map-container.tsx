"use client"

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Navigation, RefreshCw, MapPin } from "lucide-react"
import { useRestaurantStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"

declare global {
  interface Window {
    kakao: any
  }
}

export interface MapRef {
  searchPlaces: (keyword: string) => void
}

const KakaoMapContainer = forwardRef<MapRef>((props, ref) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("초기화 중...")
  const [mapCreated, setMapCreated] = useState(false)
  const [locationStatus, setLocationStatus] = useState<string>("위치 정보 없음")
  const [placesService, setPlacesService] = useState<any>(null)
  const [infoWindow, setInfoWindow] = useState<any>(null)
  const [searchMarkers, setSearchMarkers] = useState<any[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])

  const { userLocation, setUserLocation } = useRestaurantStore()

  // 외부에서 호출할 수 있는 검색 함수
  useImperativeHandle(ref, () => ({
    searchPlaces: (keyword: string) => {
      if (placesService && keyword.trim()) {
        performPlacesSearch(keyword.trim())
      }
    },
  }))

  // Places 검색 실행
  const performPlacesSearch = (keyword: string) => {
    if (!placesService || !map || !infoWindow) {
      console.error("Places service not ready")
      return
    }

    console.log("검색 키워드:", keyword)

    // 기존 검색 마커 제거
    searchMarkers.forEach((marker) => marker.setMap(null))
    setSearchMarkers([])

    // Places 검색 실행
    placesService.keywordSearch(keyword, (data: any, status: any, pagination: any) => {
      console.log("검색 결과:", data, status)

      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds()
        const newMarkers: any[] = []

        for (let i = 0; i < data.length; i++) {
          const place = data[i]
          const marker = displaySearchMarker(place)
          if (marker) {
            newMarkers.push(marker)
            bounds.extend(new window.kakao.maps.LatLng(place.y, place.x))
          }
        }

        // 검색된 장소 위치를 기준으로 지도 범위 재설정
        if (newMarkers.length > 0) {
          map.setBounds(bounds)
          setSearchMarkers(newMarkers)
          setSearchResults(data)
        }
      } else {
        console.error("Places 검색 실패:", status)
      }
    })
  }

  // 검색 결과 마커 표시
  const displaySearchMarker = (place: any) => {
    if (!map || !infoWindow) return null

    const position = new window.kakao.maps.LatLng(place.y, place.x)

    // 마커 생성
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: position,
    })

    // 마커 클릭 이벤트 - 인포윈도우 표시
    window.kakao.maps.event.addListener(marker, "click", () => {
      const content = `
        <div style="padding:8px; font-size:12px; min-width:150px; max-width:200px;">
          <div style="font-weight:bold; margin-bottom:4px;">${place.place_name}</div>
          <div style="color:#666; font-size:11px; line-height:1.3;">${place.address_name}</div>
          ${place.phone ? `<div style="color:#666; font-size:11px; margin-top:2px;">${place.phone}</div>` : ""}
          ${place.category_name ? `<div style="color:#888; font-size:10px; margin-top:2px;">${place.category_name}</div>` : ""}
        </div>
      `
      infoWindow.setContent(content)
      infoWindow.open(map, marker)
    })

    return marker
  }

  // 주소를 가져오는 함수
  const getAddressFromCoords = (lat: number, lng: number) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error("Kakao Maps services not loaded")
      return
    }

    const geocoder = new window.kakao.maps.services.Geocoder()
    const coord = new window.kakao.maps.LatLng(lat, lng)

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0]
        const fullAddress = address.address ? address.address.address_name : "주소를 찾을 수 없음"
        const district = address.address ? address.address.region_2depth_name : ""

        console.log("주소 정보:", { fullAddress, district, lat, lng })

        setUserLocation({
          lat,
          lng,
          address: fullAddress,
          district: district,
        })

        setLocationStatus(`${district} (${lat.toFixed(4)}, ${lng.toFixed(4)})`)
      } else {
        console.error("주소 변환 실패")
        setUserLocation({
          lat,
          lng,
          address: "주소 변환 실패",
          district: "",
        })
        setLocationStatus(`위치: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
      }
    })
  }

  const initMap = () => {
    if (!mapRef.current) {
      setStatus("DOM 요소 대기 중...")
      setTimeout(initMap, 100)
      return
    }

    if (!window.kakao || !window.kakao.maps) {
      setStatus("API 로드 대기 중...")
      setTimeout(initMap, 100)
      return
    }

    try {
      setStatus("지도 인스턴스 생성 중...")

      // Kakao 지도 초기화
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
        level: 3,
      }

      const kakaoMap = new window.kakao.maps.Map(mapRef.current, mapOption)
      setMap(kakaoMap)

      console.log("Kakao 지도 생성 성공", kakaoMap)

      // Places 검색 서비스 초기화
      const places = new window.kakao.maps.services.Places()
      setPlacesService(places)

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 })
      setInfoWindow(infowindow)

      setMapCreated(true)
      setLoading(false)
      setError(null)
      setStatus("지도 로드 완료")

      // 서울 시청 마커 추가
      const centerMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(37.5665, 126.978),
      })
      centerMarker.setMap(kakaoMap)

      // 사용자 위치 가져오기
      if (navigator.geolocation) {
        setLocationStatus("위치 정보 가져오는 중...")

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            console.log("사용자 위치:", userPos)

            const userLatLng = new window.kakao.maps.LatLng(userPos.lat, userPos.lng)

            // 사용자 위치 마커 추가
            const userMarker = new window.kakao.maps.Marker({
              position: userLatLng,
              image: new window.kakao.maps.MarkerImage(
                "data:image/svg+xml;base64," +
                  btoa(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#4285f4" stroke="white" strokeWidth="3"/>
                  </svg>
                `),
                new window.kakao.maps.Size(24, 24),
                { offset: new window.kakao.maps.Point(12, 12) },
              ),
            })
            userMarker.setMap(kakaoMap)

            // 한국 내에 있으면 지도 중심을 사용자 위치로 이동
            if (userPos.lat > 33 && userPos.lat < 39 && userPos.lng > 124 && userPos.lng < 132) {
              kakaoMap.setCenter(userLatLng)
              kakaoMap.setLevel(2)
            }

            // 주소 정보 가져오기
            getAddressFromCoords(userPos.lat, userPos.lng)

            // 인포윈도우 생성
            const userInfoWindow = new window.kakao.maps.InfoWindow({
              content: '<div style="padding:5px; font-size:12px;">현재 위치</div>',
            })

            // 마커 클릭 이벤트
            window.kakao.maps.event.addListener(userMarker, "click", () => {
              userInfoWindow.open(kakaoMap, userMarker)
            })
          },
          (error) => {
            console.error("위치 가져오기 실패:", error)
            setLocationStatus("위치 정보 가져오기 실패")

            // 기본 위치 설정 (서울)
            setUserLocation({
              lat: 37.5665,
              lng: 126.978,
              address: "서울특별시 중구 태평로1가",
              district: "중구",
            })
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 600000,
          },
        )
      } else {
        setLocationStatus("브라우저에서 위치 정보를 지원하지 않음")
        setUserLocation({
          lat: 37.5665,
          lng: 126.978,
          address: "서울특별시 중구 태평로1가",
          district: "중구",
        })
      }
    } catch (err) {
      console.error("지도 생성 실패:", err)
      setError("지도 생성 실패: " + err.message)
      setLoading(false)
      setStatus("지도 생성 실패")
    }
  }

  const loadScript = () => {
    setLoading(true)
    setError(null)
    setStatus("API 스크립트 로드 중...")

    // 기존 스크립트 제거
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Kakao Maps API 스크립트 로드 (services 라이브러리 포함)
    const script = document.createElement("script")
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=8a12558ecf1afe8816c6ce674a84a9bb&libraries=services&autoload=false"

    script.onload = () => {
      console.log("Kakao Maps API 로드 성공")
      setStatus("API 로드 성공, 지도 초기화 중...")

      // Kakao Maps API 초기화
      window.kakao.maps.load(() => {
        console.log("Kakao Maps 초기화 완료")
        setTimeout(initMap, 100)
      })
    }

    script.onerror = (e) => {
      console.error("Kakao Maps API 로드 실패", e)
      setError("API 스크립트 로드 실패, 네트워크 연결과 API 키를 확인해주세요")
      setLoading(false)
      setStatus("API 로드 실패")
    }

    document.head.appendChild(script)
  }

  useEffect(() => {
    // 이미 로드된 스크립트가 있는지 확인
    if (window.kakao && window.kakao.maps) {
      setStatus("API가 이미 존재, 지도 초기화 중...")
      setTimeout(initMap, 100)
      return
    }

    loadScript()
  }, [])

  const retry = () => {
    setMapCreated(false)
    loadScript()
  }

  const centerToUserLocation = () => {
    if (!map || !userLocation || !window.kakao) return

    const userLatLng = new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng)
    map.setCenter(userLatLng)
    map.setLevel(2)
  }

  const refreshLocation = () => {
    if (!navigator.geolocation) return

    setLocationStatus("위치 정보 새로고침 중...")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        getAddressFromCoords(userPos.lat, userPos.lng)

        if (map) {
          const userLatLng = new window.kakao.maps.LatLng(userPos.lat, userPos.lng)
          map.setCenter(userLatLng)
        }
      },
      (error) => {
        console.error("위치 새로고침 실패:", error)
        setLocationStatus("위치 새로고침 실패")
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  }

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 mb-2">{status}</p>
            <div className="text-xs text-gray-500">Kakao Maps API 로드 중...</div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-red-50 flex items-center justify-center z-10">
          <div className="text-center max-w-md">
            <div className="text-red-500 mb-4">
              <span className="text-lg">⚠️</span>
              <h3 className="text-lg font-semibold text-red-700 mb-2">지도 로드 실패</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <div className="text-xs text-gray-500 mb-4">
                API URL: https://dapi.kakao.com/v2/maps/sdk.js
                <br />
                JavaScript Key: 8a12558ecf1afe8816c6ce674a84a9bb
              </div>
            </div>
            <Button onClick={retry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              다시 시도
            </Button>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full" />

      {/* 위치 정보 표시 */}
      {mapCreated && (
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-700 shadow-md">
            <MapPin className="h-3 w-3 mr-1" />
            {locationStatus}
          </Badge>
          {searchResults.length > 0 && (
            <Badge variant="default" className="bg-green-500 text-white shadow-md">
              검색결과 {searchResults.length}개
            </Badge>
          )}
        </div>
      )}

      {/* 컨트롤 버튼들 */}
      {mapCreated && (
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
          <Button
            onClick={refreshLocation}
            disabled={!userLocation}
            size="sm"
            variant="outline"
            className="shadow-lg bg-white"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={centerToUserLocation} disabled={!userLocation} size="sm" className="shadow-lg">
            <Navigation className="mr-2 h-4 w-4" />내 위치
          </Button>
        </div>
      )}
    </div>
  )
})

KakaoMapContainer.displayName = "KakaoMapContainer"

export default KakaoMapContainer
