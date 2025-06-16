import { NextResponse } from "next/server"

// 模拟位置搜索API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "缺少搜索关键词" }, { status: 400 })
  }

  // 模拟一些韩国地点数据
  const locations = [
    { name: "首尔塔", lat: 37.5512, lng: 126.9882, type: "景点" },
    { name: "景福宫", lat: 37.5796, lng: 126.977, type: "景点" },
    { name: "明洞购物街", lat: 37.5635, lng: 126.985, type: "购物" },
    { name: "东大门设计广场", lat: 37.5676, lng: 127.0095, type: "景点" },
    { name: "弘大街区", lat: 37.556, lng: 126.924, type: "娱乐" },
    { name: "江南区", lat: 37.5172, lng: 127.0473, type: "区域" },
    { name: "仁川国际机场", lat: 37.4602, lng: 126.4407, type: "交通" },
  ]

  // 简单的搜索逻辑
  const results = locations.filter((loc) => loc.name.toLowerCase().includes(query.toLowerCase()))

  return NextResponse.json({ results })
}
