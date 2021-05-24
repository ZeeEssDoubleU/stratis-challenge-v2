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
	const { setReduxLocation, setReduxLocationLoading, setReduxLocationError } =
		useReduxLocationSlice()
	const { setReduxAirData, setReduxAirDataLoading } = useReduxAirDataSlice()

	// TODO: consider using to preload aqi
	// async function getLastKnownLocation() {
	// 	const location = await Location.getLastKnownPositionAsync({})
	// 	setReduxLocation(location)
	// }

	/**
	 * get air quality data
	 */
	async function getAqiData(formatLocation) {
		try {
			setReduxAirDataLoading(true)
			const data = await fetchAQI(formatLocation)
			await setReduxAirData(data)
			setReduxAirDataLoading(false)
		} catch (error) {
			console.warn(error)
		}
	}

	/**
	 * get gps coords
	 */
	async function getCurrentLocation() {
		try {
			setReduxLocationLoading(true)
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
			setReduxLocationLoading(false)
			getAqiData(formatLocation)
		} catch (error) {
			console.warn(error)
		}
	}

	/**
	 * get permission to use location
	 */
	async function requestPermissionForLocation() {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync()

			if (status === "granted") {
				await getCurrentLocation()
			} else {
				await setReduxLocationError(
					"Permission to access location was denied",
				)
			}
		} catch (error) {
			console.warn(error)
		}
	}

	useEffect(() => {
		requestPermissionForLocation()
	}, [])
}
