import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 这个中间件用于保护API密钥
export function middleware(request: NextRequest) {
  // 如果是API路由，检查是否有合法的来源
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const referer = request.headers.get("referer")

    // 检查请求是否来自我们自己的网站
    // 在生产环境中，你应该使用更严格的检查
    if (!referer || !referer.includes(request.headers.get("host") || "")) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }
  }

  return NextResponse.next()
}

// 配置匹配的路由
export const config = {
  matcher: "/api/:path*",
}
