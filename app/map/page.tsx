"use client"

import { useRef } from "react"
import KakaoMapContainer, { type MapRef } from "@/components/kakao-map-container"
import ChatInterface from "@/components/chat-interface"
import DebugPanel from "@/components/debug-panel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin } from "lucide-react"

export default function MapPage() {
  const mapRef = useRef<MapRef>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                메인화면
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">서비스 체험</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">Powered by Kakao Maps</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Map Section - 70% */}
        <div className="w-[70%] h-full">
          <KakaoMapContainer ref={mapRef} />
        </div>

        {/* Chat Section - 30% */}
        <div className="w-[30%] h-full border-l border-gray-200">
          <ChatInterface mapRef={mapRef} />
        </div>
      </div>

      {/* 添加调试面板 */}
      <DebugPanel />
    </div>
  )
}
