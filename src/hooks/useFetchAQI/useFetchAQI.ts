import axios from "axios"
import { Awaited } from "globalTypes"
import { AQICN_TOKEN as token } from "react-native-dotenv"

import { useReduxAirDataSlice } from "@redux"

import { airDataByCity, airDatabyCoords } from "./mockData"

// ************
// function
// ************

export type SetAirDataByCity = Awaited<FetchAirDataByCity>
export type FetchAirDataByCity = ReturnType<typeof fetchAQIByCity>

/**
 * function gets aqi data by city
 * @param city string
 * @returns air quality data object
 */
export async function fetchAQIByCity(city: string) {
	// use mock data to model type
	const {
		data: { data },
	}: typeof airDataByCity = await axios({
		method: `GET`,
		url: `https://api.waqi.info/feed/${city}/?token=${token}`,
	})

	return data
}

// ************
// function
// ************

export type SetAirDataByCoords = Awaited<FetchAirDataByCoords>
export type FetchAirDataByCoords = ReturnType<typeof fetchAQIByCoords>

/**
 * function gets aqi data by coordinates
 * @param latitude number
 * @param longitude number
 * @returns air quality data object
 */
export async function fetchAQIByCoords(latitude: number, longitude: number) {
	// use mock data to model type
	const {
		data: { data },
	}: typeof airDatabyCoords = await axios({
		method: `GET`,
		url: `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${token}`,
	})

	return data
}

// ************
// hook
// ************

/**
 * hook that encapsulates fetchAQI functions
 * @returns fetchAQI functions
 */
export function useFetchAQI() {
	const { setReduxAirDataLoading } = useReduxAirDataSlice()

	// call fetch aqi function
	async function handlefetchAQIByCity(city: string) {
		setReduxAirDataLoading(true)

		try {
			const data = await fetchAQIByCity(city)

			return data
		} catch (error) {
			console.error(error) // ? debug
		} finally {
			setReduxAirDataLoading(false)
		}
	}

	// call fetch aqi function
	async function handlefetchAQIByCoords(latitude: number, longitude: number) {
		setReduxAirDataLoading(true)

		try {
			const data = await fetchAQIByCoords(latitude, longitude)

			return data
		} catch (error) {
			console.error(error) // ? debug
		} finally {
			setReduxAirDataLoading(false)
		}
	}

	return {
		fetchAQIByCity: handlefetchAQIByCity,
		fetchAQIByCoords: handlefetchAQIByCoords,
	}
}
