import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import type
import {
	AirDataCurrent_I,
	AirDataLocation_I,
	AirDataForcasts_I,
	FetchAirData_I,
	formatDate,
	FormatDate_I,
} from "@utils"
// import utils
import { filterForcastByDay } from "@redux"

// ************
// types
// ************

export type DailyMeasurementsWithDate_I = {
	date: string
	relativeDay: string
	forecast: AirDataForcasts_I["forecast"]["daily"]
}
export interface AirDataStateLocation_I {
	station: string
	stationId: AirDataLocation_I["idx"]
	city: string
	state: string
}
export interface AirDataStateCurrent_I {
	time?: FormatDate_I["formatted_time"]
	date?: FormatDate_I["formatted"]
	aqi: AirDataCurrent_I["aqi"]
	dominentpol: AirDataCurrent_I["dominentpol"]
	iaqi: AirDataCurrent_I["iaqi"]
}
export type AirDataStateForecast_I = {
	today: DailyMeasurementsWithDate_I
	yesterday: DailyMeasurementsWithDate_I
	tomorrow: DailyMeasurementsWithDate_I
}
export interface AirDataState_I {
	status: string
	location: AirDataStateLocation_I
	current: AirDataStateCurrent_I
	forecast: AirDataStateForecast_I
}

// ************
// init state
// ************

const initialState: AirDataState_I = {
	status: "", // ! not used
	location: {} as AirDataStateLocation_I,
	current: {} as AirDataStateCurrent_I,
	forecast: {} as AirDataStateForecast_I,
}

// ************
// slice
// ************

export const reduxAirDataSlice = createSlice({
	name: "airData",
	initialState,
	reducers: {
		setAirData: (state, action: PayloadAction<FetchAirData_I>) => {
			const { status, data } = action.payload
			const { aqi, city, forecast, iaqi, idx, time, dominentpol } = data

			const today = filterForcastByDay(forecast, "today")
			const yesterday = filterForcastByDay(forecast, "yesterday")
			const tomorrow = filterForcastByDay(forecast, "tomorrow")

			state.status = status
			// this state is displayed in the air quality hero
			state.location = {
				station: city.name.split(",")[0].trim(),
				stationId: idx,
				city: city.name.split(",")[1].trim(),
				state: city.name.split(",")[2].trim(),
			}
			state.current = {
				time: time?.iso && formatDate(time.iso).formatted_time,
				date: time?.iso && formatDate(time.iso).formatted,
				aqi,
				dominentpol,
				iaqi,
			}
			state.forecast = {
				// each function returns all measurement forecast given for the desired day
				today: today,
				yesterday: yesterday,
				tomorrow: tomorrow,
			}
		},
	},
})
