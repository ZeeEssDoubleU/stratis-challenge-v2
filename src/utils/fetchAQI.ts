// import axios from "axios"
// import { AQICN_TOKEN as token } from "react-native-dotenv"

import { FormatLocation_I } from "../hooks"

import { data } from "../mock-data/fakeAirData"

// ************
// types
// ************

export interface DailyForecastByParam {
	avg: number
	day: string
	max: number
	min: number
}

export interface AirDataForcasts_I {
	forecast: {
		daily: {
			pm25: DailyForecastByParam[]
			pm10: DailyForecastByParam[]
			o3: DailyForecastByParam[]
			uvi: DailyForecastByParam[]
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
	status: string // !api call changes for some reason sometimes
	data: AirDataLocation_I & AirDataCurrent_I & AirDataForcasts_I
}

// ************
// hook
// ************

export async function fetchAQI({ latitude, longitude }: FormatLocation_I) {
	// const { data: response }: FetchAirData_I = await axios({
	// 	method: `GET`,
	// 	url: `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${token}`,
	// })
	// const { status, data } = response
	// const formatData = { status, data }

	// console.log("formatData:", formatData) // ? debug

	// function to sort formatData by distance, not listed as a method in AQI api
	// console.log("data:", data) // ? debug

	return data
}
