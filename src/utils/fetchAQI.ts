import axios from "axios"
import { AQICN_TOKEN as token } from "react-native-dotenv"

import { FormatLocation_I } from "../hooks"

import { data } from "../mock-data/fakeAirData"

// ************
// types
// ************

export type AirDataDailyForecasts_I = {
	avg: number
	day: string
	max: number
	min: number
}[]
export interface AirDataDailyMeasurements_I {
	pm25: AirDataDailyForecasts_I
	pm10: AirDataDailyForecasts_I
	o3: AirDataDailyForecasts_I
	uvi: AirDataDailyForecasts_I
}
export interface AirDataForecast_I {
	daily: AirDataDailyMeasurements_I
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
export interface AirData_I {
	status: string
	data: AirDataLocation_I &
		AirDataCurrent_I & {
			forecast: AirDataForecast_I
		}
}

// ************
// hook
// ************

export async function fetchAQI({ latitude, longitude }: FormatLocation_I) {
	// TODO: reimplement real data when complete
	// const { data }: AirData_I | null = await axios({
	// 	method: `GET`,
	// 	url: `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${token}`,
	// })

	// console.log("data:", data) // ? debug
	// function to sort data by distance, not listed as a method in AQI api
	// TODO: remove as when ready
	return data as AirData_I
}
