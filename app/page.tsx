import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, MessageCircle, Navigation, Code, Database, Zap, Globe, Bot } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">예산맛집 - AI 지도 맛집 검색</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/map">
              <Button variant="outline">서비스 체험</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">예산맛집 AI 검색 플랫폼</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            크롤링 기술과 AI를 결합하여 한국 전역의 맛집 정보를 실시간으로 제공하는 지능형 맛집 검색 플랫폼입니다.
            사용자의 예산과 위치를 고려한 개인화된 맛집 추천 서비스를 경험해보세요.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Code className="h-4 w-4 mr-2" />
              Next.js 15
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Bot className="h-4 w-4 mr-2" />
              Deepseek AI
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              Kakao Maps API
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Database className="h-4 w-4 mr-2" />
              Web Crawling
            </Badge>
          </div>
          <Link href="/map">
            <Button size="lg" className="text-lg px-8 py-3">
              맛집 검색 시작하기
            </Button>
          </Link>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">핵심 기술 스택</h3>
            <p className="text-lg text-gray-600">최신 웹 기술과 AI를 활용한 고성능 맛집 검색 플랫폼</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Code className="h-8 w-8 text-blue-600" />
                  <CardTitle>Frontend Technology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Next.js 15</span>
                    <Badge>App Router</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>React 18</span>
                    <Badge>Server Components</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>TypeScript</span>
                    <Badge>Type Safety</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Tailwind CSS</span>
                    <Badge>Responsive Design</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>shadcn/ui</span>
                    <Badge>Component Library</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bot className="h-8 w-8 text-green-600" />
                  <CardTitle>AI & Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Deepseek AI</span>
                    <Badge>Chat Model</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>AI SDK</span>
                    <Badge>Streaming</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>자연어 처리</span>
                    <Badge>NLP</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>키워드 추출</span>
                    <Badge>Intent Recognition</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>개인화 추천</span>
                    <Badge>ML Recommendation</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-8 w-8 text-red-600" />
                  <CardTitle>Maps & Location</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Kakao Maps API</span>
                    <Badge>Maps SDK</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Kakao Places API</span>
                    <Badge>POI Search</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Geolocation API</span>
                    <Badge>User Location</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>거리 계산</span>
                    <Badge>Distance Algorithm</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>주소 변환</span>
                    <Badge>Geocoding</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Database className="h-8 w-8 text-purple-600" />
                  <CardTitle>Data Crawling</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Python Scrapy</span>
                    <Badge>Web Scraping</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>맛집 리뷰 크롤링</span>
                    <Badge>Review Mining</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>메뉴 정보 수집</span>
                    <Badge>Menu Extraction</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>가격 정보 분석</span>
                    <Badge>Price Analysis</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>실시간 업데이트</span>
                    <Badge>Real-time Sync</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Zap className="h-8 w-8 text-yellow-600" />
                  <CardTitle>Performance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Server Actions</span>
                    <Badge>React 18</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Streaming UI</span>
                    <Badge>Real-time</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Zustand</span>
                    <Badge>State Management</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Image Optimization</span>
                    <Badge>Next.js Image</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>코드 분할</span>
                    <Badge>Bundle Optimization</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Globe className="h-8 w-8 text-indigo-600" />
                  <CardTitle>APIs & Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>REST API</span>
                    <Badge>HTTP/HTTPS</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>WebSocket</span>
                    <Badge>Real-time Chat</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>환경 변수 관리</span>
                    <Badge>Security</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>CORS 처리</span>
                    <Badge>Cross-Origin</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>API 미들웨어</span>
                    <Badge>Request Handling</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">예산맛집의 핵심 기능</h3>
          <p className="text-lg text-gray-600">AI와 빅데이터 기술로 제공하는 맞춤형 맛집 검색 서비스</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>실시간 지도 연동</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Kakao Maps API를 활용한 실시간 지도 표시와 사용자 위치 기반 맛집 검색. GPS 좌표를 통한 정확한 거리
                계산과 주소 변환 기능을 제공합니다.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>AI 대화형 검색</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Deepseek AI 모델을 활용한 자연어 처리로 사용자의 의도를 파악하고, 예산과 취향을 고려한 개인화된 맛집
                추천을 실시간 스트리밍으로 제공합니다.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Database className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>빅데이터 크롤링</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Python 크롤러를 통해 수집된 실시간 맛집 데이터베이스. 메뉴, 가격, 리뷰 정보를 자동으로 수집하여 최신
                정보를 유지합니다.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Navigation className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle>예산 기반 필터링</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                사용자의 예산 범위에 맞는 맛집을 자동으로 필터링하고, 거리와 평점을 종합적으로 고려한 최적의 맛집을
                추천합니다.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">기술적 특징 및 아키텍처</h3>
            <p className="text-xl text-gray-300">현대적인 웹 기술과 AI를 활용한 확장 가능한 시스템 설계</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-bold mb-6 text-blue-400">크롤링 시스템</h4>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 text-green-400">데이터 수집 파이프라인</h5>
                  <p className="text-gray-300 text-sm">
                    • Python Scrapy 프레임워크를 활용한 분산 크롤링 시스템
                    <br />• 네이버 플레이스, 카카오맵, 배달앱 등 다양한 소스에서 데이터 수집
                    <br />• 실시간 메뉴 및 가격 정보 업데이트
                    <br />• 사용자 리뷰 및 평점 데이터 마이닝
                    <br />• 중복 제거 및 데이터 정규화 처리
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 text-yellow-400">지능형 데이터 처리</h5>
                  <p className="text-gray-300 text-sm">
                    • NLP를 활용한 메뉴명 정규화
                    <br />• 가격 정보 자동 추출 및 분석
                    <br />• 이미지 메타데이터 추출
                    <br />• 영업시간 및 휴무일 정보 파싱
                    <br />• 카테고리 자동 분류 시스템
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-6 text-blue-400">AI 검색 엔진</h4>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 text-green-400">자연어 처리</h5>
                  <p className="text-gray-300 text-sm">
                    • Deepseek AI 모델을 활용한 의도 분석
                    <br />• 다국어 지원 (한국어, 중국어, 영어)
                    <br />• 컨텍스트 기반 키워드 추출
                    <br />• 예산 범위 자동 인식
                    <br />• 지역명 및 음식 카테고리 분류
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 text-yellow-400">개인화 추천</h5>
                  <p className="text-gray-300 text-sm">
                    • 사용자 위치 기반 거리 계산
                    <br />• 예산 대비 가성비 분석
                    <br />• 평점 및 리뷰 수 종합 평가
                    <br />• 실시간 영업 상태 확인
                    <br />• 선호도 학습 및 맞춤 추천
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4 text-purple-400">시스템 성능 지표</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-400">50,000+</div>
                  <div className="text-gray-300">수집된 맛집 데이터</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">&lt;500ms</div>
                  <div className="text-gray-300">평균 검색 응답 시간</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">95%+</div>
                  <div className="text-gray-300">AI 의도 인식 정확도</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400">24/7</div>
                  <div className="text-gray-300">실시간 데이터 업데이트</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">예산맛집 활용 시나리오</h3>
            <p className="text-lg text-gray-600">다양한 상황에서 최적의 맛집을 찾는 스마트한 방법</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🍽️</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">예산 맞춤 검색</h4>
              <div className="space-y-2 text-left bg-white p-4 rounded-lg">
                <p className="text-sm">
                  <strong>사용자:</strong> "30000원으로 신촌에서 3명이 먹을 수 있는 곳"
                </p>
                <p className="text-sm">
                  <strong>AI 분석:</strong> 1인당 10,000원 예산, 신촌 지역, 3인 가능
                </p>
                <p className="text-sm">
                  <strong>결과:</strong> 예산 범위 내 맛집 3곳 + 거리/평점 정보
                </p>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">☕</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">상황별 추천</h4>
              <div className="space-y-2 text-left bg-white p-4 rounded-lg">
                <p className="text-sm">
                  <strong>사용자:</strong> "데이��하기 좋은 이태원 카페"
                </p>
                <p className="text-sm">
                  <strong>AI 분석:</strong> 분위기 좋은 카페, 이태원 지역, 데이트 목적
                </p>
                <p className="text-sm">
                  <strong>결과:</strong> 분위기 있는 카페 + 가격대/인테리어 정보
                </p>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">실시간 정보</h4>
              <div className="space-y-2 text-left bg-white p-4 rounded-lg">
                <p className="text-sm">
                  <strong>사용자:</strong> "지금 열려있는 강남 맛집"
                </p>
                <p className="text-sm">
                  <strong>AI 분석:</strong> 현재 시간, 영업 상태, 강남 지역
                </p>
                <p className="text-sm">
                  <strong>결과:</strong> 영업 중인 맛집 + 대기시간/주문 가능 여부
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">예산맛집으로 스마트한 맛집 검색을 시작하세요</h3>
          <p className="text-xl text-blue-100 mb-8">
            AI 기술과 빅데이터를 활용한 개인화된 맛집 추천 서비스를 지금 바로 체험해보세요
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/map">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                맛집 검색 시작
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            >
              기술 문서 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-6 w-6" />
                <span className="text-lg font-semibold">예산맛집</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI와 빅데이터 기술을 활용한
                <br />
                스마트 맛집 검색 플랫폼
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">핵심 기술</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Next.js 15 + React 18</li>
                <li>Deepseek AI Integration</li>
                <li>Kakao Maps API</li>
                <li>Python Web Crawling</li>
                <li>TypeScript + Tailwind</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">주요 기능</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>실시간 맛집 검색</li>
                <li>예산 기반 필터링</li>
                <li>AI 대화형 인터페이스</li>
                <li>위치 기반 추천</li>
                <li>크롤링 데이터 분석</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">데이터 소스</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>네이버 플레이스</li>
                <li>카카오맵</li>
                <li>배달의민족</li>
                <li>요기요</li>
                <li>쿠팡이츠</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 예산맛집. AI 기반 맛집 검색 플랫폼.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
