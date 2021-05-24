import axios from "axios"
import { AQICN_TOKEN as token } from "react-native-dotenv"

import { FormatLocation_I } from "../hooks"

import { data } from "../mock-data/fakeAirData"

// ************
// types
// ************

export interface AirDataForecastByDay_I {
	avg: number
	day: string
	max: number
	min: number
}
export type AirDataForecastsByParam_I = AirDataForecastByDay_I[]
export interface AirDataForcasts_I {
	forecast: {
		daily: {
			pm25: AirDataForecastsByParam_I
			pm10: AirDataForecastsByParam_I
			o3: AirDataForecastsByParam_I
			uvi: AirDataForecastsByParam_I
		}
	}
}
export interface AirDataLocation_I {
	idx: number
	city: {
		name: string
		geo: number[]
		url: string
	}
	attributions: {
		[key: string]: string | undefined
	}[]
	dominentpol: string
}
export interface AirDataCurrent_I {
	aqi: number
	time: {
		s: string
		tz: string
		iso?: string
		v?: number
	}
	dominentpol?: string
	iaqi: {
		pm25: {
			v: number
		}
		[key: string]: {
			v: number
		}
	}
}
// ! unfortunately aqicn API is not well documented.  This api response is based on the given "city/station feed" API example
export interface FetchAirData_I {
	status: string
	data: AirDataLocation_I & AirDataCurrent_I & AirDataForcasts_I
}

// ************
// hook
// ************

export async function fetchAQI({ latitude, longitude }: FormatLocation_I) {
	// TODO: reimplement real data when complete
	// const { data }: FetchAirData_I | null = await axios({
	// 	method: `GET`,
	// 	url: `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${token}`,
	// })

	// console.log("data:", data) // ? debug
	// function to sort data by distance, not listed as a method in AQI api
	// TODO: remove as when ready
	return data as FetchAirData_I
}
