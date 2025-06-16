import { create } from "zustand"
import type { Restaurant } from "./types"

interface LocationInfo {
  lat: number
  lng: number
  address?: string
  district?: string
}

interface RestaurantStore {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  userLocation: LocationInfo | null
  updateRestaurants: (restaurants: Restaurant[]) => void
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
  setUserLocation: (location: LocationInfo | null) => void
}

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  restaurants: [],
  selectedRestaurant: null,
  userLocation: null,
  updateRestaurants: (restaurants) => set({ restaurants }),
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
  setUserLocation: (location) => set({ userLocation: location }),
}))
