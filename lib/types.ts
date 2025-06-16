export interface Restaurant {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  rating: number
  priceRange: string
  cuisine: string
  distance?: number // 距离用户的距离（米）
  imageUrl?: string
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface RestaurantSearchParams {
  query?: string
  budget?: number
  cuisine?: string
  location?: {
    lat: number
    lng: number
  }
  radius?: number
}

export interface RestaurantDetail {
  id: string
  name: string
  address: string
  phone?: string
  lat: number
  lng: number
  category: string
  rating?: number
  reviewCount?: number
  openHours?: string
  priceRange?: string
  website?: string
  menu?: { name: string; price: string; description?: string }[]
  photos?: string[]
  kakaoPlaceId?: string
}
