import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { isEmpty } from "lodash"
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
} | null
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
	status: string | null
	location: AirDataStateLocation_I | null
	current: AirDataStateCurrent_I | null
	forecast: AirDataStateForecast_I
}

// ************
// init state
// ************

const initialState: AirDataState_I = {
	status: null,
	location: null,
	current: null,
	forecast: {
		today: null,
		yesterday: null,
		tomorrow: null,
	},
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

			state.status = status
			// this state is displayed in the air quality hero
			state.location = {
				station: city.name.split(",")[0].trim(),
				stationId: idx,
				city: city.name.split(",")[1].trim(),
				state: city.name.split(",")[2].trim(),
			}
			state.current = {
				time: time?.iso ? formatDate(time.iso).formatted_time : null,
				date: time?.iso ? formatDate(time.iso).formatted : null,
				aqi,
				dominentpol,
				iaqi,
			}
			state.forecast = {
				// each function returns all measurement forecast given for the desired day
				today: filterForcastByDay(forecast, "today"),
				yesterday: filterForcastByDay(forecast, "yesterday"),
				tomorrow: filterForcastByDay(forecast, "tomorrow"),
			}
		},
	},
})
