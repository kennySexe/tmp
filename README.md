<div align="center">

![LOGO](./LOGO.png)

# 예산맛집 - AI 지도 맛집 검색 플랫폼

![GitHub license](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.3-green)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen)
## Link

Check Here to Experience my products! 

->[예산 맛집](https://v0-new-project-x6pcnftuf9i.vercel.app/)<-

</div>

## Introduction

>예산맛집은 AI 기술과 웹 크롤링을 결합하여 사용자의 예산과 위치를 고려한 맞춤형 맛집 추천 서비스를 제공하는 현대적인 웹 애플리케이션입니다. Next.js 15와 React 18의 최신 기능을 활용하여 구축되었으며, Deepseek AI 모델을 통한 자연어 처리와 Kakao Maps API를 통한 실시간 지도 서비스를 제공합니다.
>>가격을 입력해 크롤링 기술과 AI를 결합한 지능형 맛집 검색 서비스

## Clone

Get `git clone https://github.com/kennySexe/tmp.git`.


## Features

**AI 대화형 검색**: `Deepseek AI 모델을 활용한 자연어 처리`

**실시간 지도 연동**: `Kakao Maps API 기반 위치 서비스`

**빅데이터 크롤링**: `Python Scrapy 기반 실시간 데이터 수집`

## Technology stack

* Frontend
  * Next.js 15
  * React 18
  * TypeScript 5
  * Tailwind CSS 3.4
  * shadcn/ui

* AI & Backend
  * Deepseek AI
  * Python 3.11 (크롤링)

* APIs & Services
  * Kakao Maps API
  * Kakao Places API
  * Web Geolocation API


## Structure

<pre>tmp/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chat/route.ts         # AI 챗봇 API
│   │   ├── location/route.ts     # 위치 검색 API
│   │   └── test/route.ts         # 테스트 API
│   ├── map/                      # 지도 페이지
│   │   └── page.tsx
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   ├── loading.tsx               # 로딩 컴포넌트
│   └── page.tsx                  # 메인 페이지
├── components/                   # React 컴포넌트
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── chat-interface.tsx        # 채팅 인터페이스
│   ├── debug-panel.tsx           # 디버그 패널
│   ├── kakao-map-container.tsx   # 카카오맵 컨테이너
│   └── theme-provider.tsx        # 테마 프로바이더
├── lib/                          # 유틸리티 라이브러리
│   ├── store.ts                  # Zustand 스토어
│   ├── types.ts                  # TypeScript 타입
│   └── utils.ts                  # 유틸리티 함수
├── public/                       # 정적 파일
├── middleware.ts                 # Next.js 미들웨어
├── next.config.mjs               # Next.js 설정
├── tailwind.config.ts            # Tailwind CSS 설정
├── tsconfig.json                 # TypeScript 설정
└── package.json                  # 프로젝트 의존성</pre>

## Architecture

| Category | 데이터 플로우 | 핵심 컴포넌트 |
|----------|-------------------|----------------------|
| 1.| 사용자가 자연어로 맛집 검색 요청 | ChatInterface: AI 대화 인터페이스 |
| 2.| AI가 키워드 추출 및 의도 분석 | KakaoMapContainer: 지도 및 마커 관리|
| 3.| 위치 정보와 함께 맛집 데이터베이스 검색 | DebugPanel: 개발 및 디버깅 도구 |
|4. | 크롤링된 실시간 데이터와 매칭 | API Routes: 백엔드 로직 처리|
|5. | 예산 및 거리 기반 필터링 | Middleware: 보안 및 인증 |
| 6.| 지도에 결과 마커 표시 | Store: 전역 상태 관리 |
| 7.| AI가 추천 결과를 자연어로 응답 | - |


## Plaintext

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │    │   (API Routes)  │    │   Services      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • React 18      │◄──►│ • AI SDK        │◄──►│ • Deepseek AI   │
│ • TypeScript    │    │ • Server Actions│    │ • Kakao Maps    │
│ • Tailwind CSS  │    │ • Middleware    │    │ • Kakao Places  │
│ • shadcn/ui     │    │ • Zustand       │    │ • Geolocation   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Data Layer    │
                    │   (Crawling)    │
                    ├─────────────────┤
                    │ • Python Scrapy │
                    │ • Data Pipeline │
                    │ • NLP Processing│
                    │ • Real-time Sync│
                    └─────────────────┘
```

## Contact

If you have any questions, please raise an issue or contact me `2021147515@yonsei.ac.kr`
