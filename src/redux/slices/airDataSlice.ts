import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import type
import {
	AirData_I,
	AirDataCurrent_I,
	AirDataDailyMeasurements_I,
	AirDataLocation_I,
} from "../../utils"
// import utils
import { formatCurrentDate, CurrentDate_I } from "../../utils"
import { filterForcastByDay } from "../helpers"

// ************
// types
// ************

export interface DailyMeasurementsWithDate_I {
	date: string
	relativeDay: string
	forecast: AirDataDailyMeasurements_I
}
export interface AirDataStateLocation_I {
	station: string
	stationId: AirDataLocation_I["idx"]
	city: string
	state: string
}
export interface AirDataStateCurrent_I {
	time?: CurrentDate_I["formatted_time"]
	date?: CurrentDate_I["formatted"]
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
	forecast: AirDataStateForecast_I | null
}

// ************
// init state
// ************

const initialState: AirDataState_I = {
	status: null,
	location: null,
	current: null,
	forecast: null,
}

// ************
// slice
// ************

export const airDataSlice = createSlice({
	name: "airData",
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<AirData_I>) => {
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
				// time: time.iso && formatCurrentDate(time.iso).formatted_time,
				// date: time.iso && formatCurrentDate(time.iso).formatted,
				aqi,
				// dominentpol,
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

const reducer = airDataSlice.reducer
