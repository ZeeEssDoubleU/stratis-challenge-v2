import { useState, useEffect } from "react"
import Location from "expo-location"
// import actions
import { useLocationSlice } from "../redux"

// ************
// types
// ************

export interface UseLocation_I {
	errorMsg: string | null
	location: {
		latitude: number
		longitude: number
		timestamp: number
	}
	loading: boolean
}

// ************
// hook
// ************

export function useLocation(): UseLocation_I {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const { location, setLocation } = useLocationSlice()

	// TODO: consider using to preload aqi
	// async function getLastKnownLocation() {
	// 	const location = await Location.getLastKnownPositionAsync({})
	// 	setLocation(location)
	// }

	async function getCurrentLocation() {
		const {
			coords: { latitude, longitude },
			timestamp,
		} = await Location.getCurrentPositionAsync({})

		// set formatted location
		setLocation({
			latitude,
			longitude,
			timestamp,
		})
	}

	async function requestPermission() {
		const { status } = await Location.requestForegroundPermissionsAsync()

		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied")
		} else {
			getCurrentLocation()
		}
	}

	useEffect(() => {
		requestPermission()
	}, [])

	return {
		errorMsg,
		location,
		loading: !errorMsg || !location,
	}
}
