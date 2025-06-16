import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// 使用Deepseek API
const deepseek = createOpenAI({
  apiKey: "sk-eb16c315e40c49bb9817a13fb8d62eeb",
  baseURL: "https://api.deepseek.com",
})

export async function POST(req: Request) {
  try {
    console.log("收到聊天请求")
    const { messages, userLocation } = await req.json()
    console.log("消息:", messages)
    console.log("用户位置:", userLocation)

    // 获取最新的用户消息
    const lastUserMessage = messages[messages.length - 1]?.content || ""

    // 构建包含位置信息和关键词提取的系统提示
    let systemPrompt = `你是韩国美食搜索助手。你需要做两件事：

1. 从用户的问题中提取地点搜索关键词（如果有的话）
2. 查找符合条件的餐厅，当你查找到相关信息时返还给用户，使用以下类似格式：

1. [店铺名称] - [简短描述]
   地址：[地址]
   距离：[距离]
   价格：[价格]
2. [店铺名称] - [简短描述]
   地址：[地址]
   距离：[距离]
   价格：[价格]
3. [店铺名称] - [简短描述]
   地址：[地址]
   距离：[距离]
   价格：[价格]

关键词提取规则：
- 如果用户提到具体地点+类型（如"新村炸鸡店"、"이태원 맛집"、"강남 카페"），提取完整关键词
- 如果用户只提到类型（如"炸鸡店"、"카페"、"맛집"），结合当前位置提取关键词
- 如果用户没有提到地点搜索相关内容，不提取关键词

回复格式：
如果需要搜索地点，请在回复开头添加：[SEARCH:关键词]
例如：[SEARCH:신촌 치킨] 신촌 지역의 치킨집을 찾아드릴게요!

支持韩语、中文、英语关键词提取。`

    if (userLocation) {
      const locationInfo = []

      if (userLocation.address) {
        locationInfo.push(`주소: ${userLocation.address}`)
      }

      if (userLocation.district) {
        locationInfo.push(`지역: ${userLocation.district}`)
      }

      locationInfo.push(`좌표: 위도 ${userLocation.lat.toFixed(4)}, 경도 ${userLocation.lng.toFixed(4)}`)

      systemPrompt += `\n\n현재 사용자 위치 정보:\n${locationInfo.join("\n")}\n\n이 위치 정보를 바탕으로 근처의 맛집, 카페, 음식점을 추천하고 구체적인 지역명을 포함해서 답변해주세요. 사용자가 위치 관련 질문을 하면 현재 위치를 기준으로 답변하세요.`
    } else {
      systemPrompt += "\n\n사용자의 위치 정보가 없습니다. 일반적인 한국 맛집 정보를 제공해주세요."
    }

    console.log("시스템 프롬프트:", systemPrompt)
    console.log("사용자 메시지:", lastUserMessage)

    const result = await streamText({
      model: deepseek("deepseek-chat"),
      system: systemPrompt,
      messages,
      maxTokens: 300,
    })

    console.log("AI 응답 생성 성공")
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("API 오류:", error)
    return new Response(JSON.stringify({ error: "서버 오류: " + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
