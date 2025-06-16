"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, MapPin } from "lucide-react"
import { useRestaurantStore } from "@/lib/store"

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [testResults, setTestResults] = useState<any>({})
  const { userLocation } = useRestaurantStore()

  const testKakaoMaps = () => {
    // 检查当前加载的脚本URL
    const scriptElement = document.querySelector('script[src*="dapi.kakao.com"]') as HTMLScriptElement
    const scriptUrl = scriptElement ? scriptElement.src : "未找到脚本"

    const result = {
      scriptLoaded: !!document.querySelector('script[src*="dapi.kakao.com"]'),
      kakaoObject: !!window.kakao,
      mapsObject: !!(window.kakao && window.kakao.maps),
      servicesLoaded: !!(window.kakao && window.kakao.maps && window.kakao.maps.services),
      apiKey: "8a12558ecf1afe8816c6ce674a84a9bb",
      apiUrl: scriptUrl,
      currentPage: window.location.pathname,
      timestamp: new Date().toLocaleTimeString(),
    }
    setTestResults((prev) => ({ ...prev, kakao: result }))
  }

  const testChatWithLocation = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "근처에 맛있는 한식당 추천해줘" }],
          userLocation: userLocation,
        }),
      })

      const result = {
        status: response.status,
        ok: response.ok,
        locationSent: !!userLocation,
        timestamp: new Date().toLocaleTimeString(),
      }
      setTestResults((prev) => ({ ...prev, chat: result }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        chat: {
          error: error.message,
          timestamp: new Date().toLocaleTimeString(),
        },
      }))
    }
  }

  const reloadPage = () => {
    window.location.reload()
  }

  if (!isOpen) {
    return (
      <Button className="fixed bottom-4 left-4 z-50" variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        DEBUG
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 w-80 max-h-96 overflow-y-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">TEST</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={reloadPage} title="刷新页面">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              ×
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 위치 정보 */}
        <div>
          <div className="text-sm font-medium mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            위치 정보
          </div>
          {userLocation ? (
            <div className="text-xs space-y-1 bg-green-50 p-2 rounded">
              <div>
                <strong>지역:</strong> {userLocation.district || "알 수 없음"}
              </div>
              <div>
                <strong>주소:</strong> {userLocation.address || "주소 정보 없음"}
              </div>
              <div>
                <strong>좌표:</strong> {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              위치 정보를 가져오는 중이거나 사용할 수 없습니다.
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Kakao지도</span>
            <Button size="sm" variant="outline" onClick={testKakaoMaps}>
              테스트
            </Button>
          </div>
          {testResults.kakao && (
            <div className="text-xs space-y-1">
              <div>
                스크립트:{" "}
                <Badge variant={testResults.kakao.scriptLoaded ? "default" : "destructive"}>
                  {testResults.kakao.scriptLoaded ? "로드됨" : "로드 안됨"}
                </Badge>
              </div>
              <div>
                Kakao 객체:{" "}
                <Badge variant={testResults.kakao.kakaoObject ? "default" : "destructive"}>
                  {testResults.kakao.kakaoObject ? "존재" : "없음"}
                </Badge>
              </div>
              <div>
                Maps 객체:{" "}
                <Badge variant={testResults.kakao.mapsObject ? "default" : "destructive"}>
                  {testResults.kakao.mapsObject ? "존재" : "없음"}
                </Badge>
              </div>
              <div>
                Services:{" "}
                <Badge variant={testResults.kakao.servicesLoaded ? "default" : "destructive"}>
                  {testResults.kakao.servicesLoaded ? "로드됨" : "로드 안됨"}
                </Badge>
              </div>
              <div className="text-xs text-gray-500">API Key: {testResults.kakao.apiKey}</div>
              <div className="text-gray-500">{testResults.kakao.timestamp}</div>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">위치 기반 채팅</span>
            <Button size="sm" variant="outline" onClick={testChatWithLocation}>
              테스트
            </Button>
          </div>
          {testResults.chat && (
            <div className="text-xs space-y-1">
              {testResults.chat.error ? (
                <div>
                  오류: <Badge variant="destructive">{testResults.chat.error}</Badge>
                </div>
              ) : (
                <>
                  <div>
                    상태:{" "}
                    <Badge variant={testResults.chat.ok ? "default" : "destructive"}>{testResults.chat.status}</Badge>
                  </div>
                  <div>
                    위치 전송:{" "}
                    <Badge variant={testResults.chat.locationSent ? "default" : "secondary"}>
                      {testResults.chat.locationSent ? "성공" : "위치 정보 없음"}
                    </Badge>
                  </div>
                </>
              )}
              <div className="text-gray-500">{testResults.chat.timestamp}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
