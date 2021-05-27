import * as Location from 'expo-location';
import { useEffect } from 'react';

import { Awaited } from '../@types/global';
import { useReduxAirDataSlice, useReduxLocationSlice } from '../redux/hooks';
import { useFetchAQI } from './useFetchAQI';

// ************
// types
// ************

export type SetCurrentLocation = Awaited<GetCurrentLocation>
export type GetCurrentLocation = ReturnType<typeof getCurrentLocation>

// ************
// function
// ************

/**
 * gets current gps coordinates
 * @returns latitude, longitude, and timestamp
 */
export async function getCurrentLocation() {
	const {
		coords: { latitude, longitude },
		timestamp,
	} = await Location.getCurrentPositionAsync({})

	return {
		latitude,
		longitude,
		timestamp,
	}
}

// ************
// hook
// ************

export function useGetLocation(): void {
	const { setReduxLocation, setReduxLocationLoading, setReduxLocationError } =
		useReduxLocationSlice()
	const { setReduxAirData } = useReduxAirDataSlice()
	const { fetchAQIByCoords } = useFetchAQI()

	/**
	 * function gets current gps location
	 */
	async function handleGetCurrentLocation() {
		setReduxLocationLoading(true)

		try {
			const location = await getCurrentLocation()

			const { latitude, longitude } = location

			// set location in global state
			setReduxLocation(location)

			// ! fetch and set AQI data
			const data = await fetchAQIByCoords(latitude, longitude)

			setReduxAirData(data)
		} catch (error) {
			console.error(error) // ? debug
		} finally {
			setReduxLocationLoading(false)
		}
	}

	/**
	 * get permission to use location
	 */
	async function requestPermissionForLocation() {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync()

			if (status === "granted") {
				await handleGetCurrentLocation()
			} else {
				await setReduxLocationError(
					"Permission to access location was denied",
				)
			}
		} catch (error) {
			console.error(error) // ? debug
		}
	}

	useEffect(() => {
		requestPermissionForLocation()
	}, [])
}
