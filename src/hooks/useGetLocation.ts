import { useEffect } from "react"
import * as Location from "expo-location"

import { useReduxAirDataSlice, useReduxLocationSlice } from "../redux"
import { fetchAQI } from "../utils"

// ************
// types
// ************

export interface FormatLocation_I {
	latitude: number
	longitude: number
	timestamp: number
}

// ************
// hook
// ************

export function useGetLocation(): void {
	const { setReduxLocation, setReduxLocationError } = useReduxLocationSlice()
	const { setReduxAirData } = useReduxAirDataSlice()

	// TODO: consider using to preload aqi
	// async function getLastKnownLocation() {
	// 	const location = await Location.getLastKnownPositionAsync({})
	// 	setReduxLocation(location)
	// }

	async function getCurrentLocation() {
		const {
			coords: { latitude, longitude },
			timestamp,
		} = await Location.getCurrentPositionAsync({})

		const formatLocation = {
			latitude,
			longitude,
			timestamp,
		}

		// set location in global state
		setReduxLocation(formatLocation)
		// fetch AQI data
		const data = await fetchAQI(formatLocation)
		setReduxAirData(data)
	}

	async function requestPermission() {
		const { status } = await Location.requestForegroundPermissionsAsync()

		if (status !== "granted") {
			await setReduxLocationError("Permission to access location was denied")
		} else {
			await getCurrentLocation()
		}
	}

	useEffect(() => {
		requestPermission()
	}, [])
}
