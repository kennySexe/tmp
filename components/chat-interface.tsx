"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Send, Loader2, Bot, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRestaurantStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import type { MapRef } from "./kakao-map-container"

interface ChatInterfaceProps {
  mapRef?: React.RefObject<MapRef>
}

export default function ChatInterface({ mapRef }: ChatInterfaceProps) {
  const { userLocation } = useRestaurantStore()

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("聊天错误:", error)
    },
    onFinish: (message) => {
      // 检查AI回复中是否包含搜索关键词
      const content = message.content
      const searchMatch = content.match(/\[SEARCH:([^\]]+)\]/)

      if (searchMatch && mapRef?.current) {
        const keyword = searchMatch[1].trim()
        console.log("提取到搜索关键词:", keyword)

        // 调用地图搜索功能
        setTimeout(() => {
          mapRef.current?.searchPlaces(keyword)
        }, 500) // 稍微延迟以确保消息显示完成
      }
    },
    // 在发送消息时包含位置信息
    body: {
      userLocation: userLocation,
    },
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 当消息更新时，滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // 处理显示的消息内容（移除搜索标记）
  const getDisplayContent = (content: string) => {
    return content.replace(/\[SEARCH:[^\]]+\]\s*/, "")
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-blue-600" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">AI CHATBOT</h2>
            <p className="text-sm text-gray-500">맛집찾기</p>
          </div>
        </div>

        {/* 위치 정보 표시 */}
        {userLocation && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              {userLocation.district || "위치 정보"}
              {userLocation.address && (
                <span className="ml-1 text-gray-500">
                  ({userLocation.lat.toFixed(3)}, {userLocation.lng.toFixed(3)})
                </span>
              )}
            </Badge>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {/* 添加错误显示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">连接错误: {error.message}</p>
              <p className="text-xs text-red-500 mt-1">请检查网络连接或稍后重试</p>
            </div>
          )}

          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="mb-2">안녕하세요! 한국 맛집 검색 도우미입니다.</p>
              <div className="text-sm space-y-1">
                <p>현재 위치를 기반으로 질문해보세요:</p>
                <div className="bg-gray-50 rounded-lg p-3 mt-2 space-y-1 text-left">
                  <p>• "근처에 맛있는 한식당 추천해줘"</p>
                  <p>• "이태원 맛집 찾아줘"</p>
                  <p>• "30000원 이하 신촌 치킨집"</p>
                  <p>• "강남 카페 어디가 좋을까?"</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex items-start gap-3", message.role === "user" ? "flex-row-reverse" : "flex-row")}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback
                    className={cn(message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600")}
                  >
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[80%] text-sm",
                    message.role === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-100 text-gray-900",
                  )}
                >
                  {getDisplayContent(message.content)}
                  {/* 如果是AI消息且包含搜索关键词，显示搜索提示 */}
                  {message.role === "assistant" && message.content.includes("[SEARCH:") && (
                    <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      🗺️ 지도에서 검색 결과를 확인하세요
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200 text-gray-600">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-gray-600">위치 기반으로 답변 생성 중...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={userLocation ? `${userLocation.district}에서 질문하기...` : "한국 맛집에 대해 질문하기..."}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="sm">
            <Send className="h-4 w-4" />
            <span className="sr-only">발송</span>
          </Button>
        </form>

        <div className="mt-2 text-xs text-gray-500">
          <p>💡 예시: "이태원 맛집", "30000원 이하 신촌 치킨집", "강남 카페 추천"</p>
          {!userLocation && <p>위치 정보를 가져오는 중... 더 정확한 추천을 위해 위치 권한을 허용해주세요.</p>}
        </div>
      </div>
    </div>
  )
}
