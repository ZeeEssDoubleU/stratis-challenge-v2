import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetAirDataByCoords } from '../../hooks/useFetchAQI';
import { formatDate, FormatDate } from '../../utils';
import { FilteredForecast, filterForcastByDay } from '../helpers';

// ************
// types
// ************

export interface AirDataStateLocation_I {
	station: string
	stationId: SetAirDataByCoords["idx"]
	city: string
	state: string
}
export interface AirDataStateCurrent_I {
	time?: FormatDate["formatted_time"]
	date?: FormatDate["formatted"]
	aqi: SetAirDataByCoords["aqi"]
	dominentpol: SetAirDataByCoords["dominentpol"]
	iaqi: SetAirDataByCoords["iaqi"]
}
export type AirDataStateForecast_I = {
	today: FilteredForecast
	yesterday: FilteredForecast
	tomorrow: FilteredForecast
}
export interface AirDataState_I {
	loading: boolean
	location: AirDataStateLocation_I
	current: AirDataStateCurrent_I
	forecast: AirDataStateForecast_I
}

// ************
// init state
// ************

const initialState: AirDataState_I = {
	loading: true,
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
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setData: (state, action: PayloadAction<SetAirDataByCoords>) => {
			const { aqi, city, forecast, iaqi, idx, time, dominentpol } =
				action.payload

			const today = filterForcastByDay(forecast, "today")
			const yesterday = filterForcastByDay(forecast, "yesterday")
			const tomorrow = filterForcastByDay(forecast, "tomorrow")

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
