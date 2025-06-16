import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "API测试成功",
    timestamp: new Date().toISOString(),
    env: {
      hasDeepseekKey: !!process.env.DEEPSEEK_API_KEY,
      hasNaverKey: !!process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    },
  })
}
