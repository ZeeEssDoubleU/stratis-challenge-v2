import axios from 'axios';
import { AQICN_TOKEN as token } from 'react-native-dotenv';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetAirDataByCoords } from '../../hooks/useFetchAQI';
import { airDataByCity } from '../../hooks/useFetchAQI/mockData/airDataByCity';
import {
    airDatabyCoords
} from '../../hooks/useFetchAQI/mockData/airDatabyCoords';
import { formatDate, FormatDate } from '../../utils';
import { FilteredForecast, filterForcastByDay } from '../helpers';
import { reactotron } from '../middleware/ReactotronConfig';

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
	location: AirDataStateLocation_I
	current: AirDataStateCurrent_I
	forecast: AirDataStateForecast_I
	loading: boolean
	currentRequestId: number | undefined
}

// ************
// thunk
// ************

export type FetchAirDataByCity = ReturnType<typeof fetchAQIByCity>

/**
 * async fetches AQI data by city
 * @param {string} city
 * @returns {object} AQI data object
 */

export const fetchAQIByCity = createAsyncThunk(
	"airData/fetchAQIByCity",
	async (city: string, thunkAPI) => {
		const {
			data: { data },
		}: typeof airDataByCity = await axios({
			method: `GET`,
			url: `https://api.waqi.info/feed/${city}/?token=${token}`,
		})

		return data
	},
)

// ************
// thunk
// ************

export type FetchAirDataByCoords = ReturnType<typeof fetchAQIByCoords>

/**
 * async fetches AQI data by coordinates
 * @param {number} latitude
 * @param {number} longitude
 * @returns {object} AQI data object
 */
export const fetchAQIByCoords = createAsyncThunk(
	"airData/fetchAQIByCoords",
	async (location: { latitude: number; longitude: number }, thunkAPI) => {
		const { latitude, longitude } = location
		reactotron.log("location:", location) // ? debug

		// ! used mock data to model type
		const {
			data: { data },
		}: typeof airDatabyCoords = await axios({
			method: `GET`,
			url: `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${token}`,
		})

		return data
	},
)

// ************
// init state
// ************

const initialState: AirDataState_I = {
	location: {} as AirDataStateLocation_I,
	current: {} as AirDataStateCurrent_I,
	forecast: {} as AirDataStateForecast_I,
	loading: false,
	currentRequestId: undefined,
}

// ************
// slice
// ************

export const reduxAirDataSlice = createSlice({
	name: "airData",
	initialState,
	reducers: {},
	extraReducers: {
		/**
		 * fetch AQI by coords
		 */
		[fetchAQIByCoords.pending]: (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		},
		[fetchAQIByCoords.fulfilled]: (
			state,
			action: PayloadAction<SetAirDataByCoords>,
		) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
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
				state.loading = false
			}
		},
		[fetchAQIByCoords.rejected]: (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.error = action.error
				state.loading = false
			}
		},
	},
})
