import axios from 'axios';
import { AQICN_TOKEN as token } from 'react-native-dotenv';
import reactotron from 'reactotron-react-native';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetAirDataByCoords } from '../../hooks/useFetchAQI';
import { airDataByCity } from '../../hooks/useFetchAQI/mockData/airDataByCity';
import {
    airDatabyCoords
} from '../../hooks/useFetchAQI/mockData/airDatabyCoords';
import { getCity } from './airDataSelectors';

// ************
// types
// ************

export interface AirDataState_I {
	currentLocation: string
	allLocations: string[]
	airDataByLocation: {
		[location: string]: FetchAirDataByCity | FetchAirDataByCoords
	}
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

export type FetchAirDataByCoords = ReturnType<typeof fetchAQIByCoords_fix>

/**
 * async fetches AQI data by coordinates
 * @param {number} latitude
 * @param {number} longitude
 * @returns {object} AQI data object
 */
export const fetchAQIByCoords_fix = createAsyncThunk(
	"airData_fix/fetchAQIByCoords_fix",
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
	currentLocation: "",
	allLocations: [],
	airDataByLocation: {},
	loading: false,
	currentRequestId: undefined,
}

// ************
// slice
// ************

export const airDataSlice = createSlice({
	name: "airData_fix",
	initialState,
	reducers: {
		setAirData: (
			state,
			action: PayloadAction<SetAirDataByCoords | SetAirDataByCity>,
		) => {
			// TODO: split this out into selector
			const { city } = action.payload
			const formatCity = getCity(city)

			if (!state.airDataByLocation[formatCity]) {
				state.allLocations.push(formatCity)
			}
			state.airDataByLocation[formatCity] = action.payload
		},
	},
	extraReducers: {
		/**
		 * fetch AQI by coords
		 */
		[fetchAQIByCoords_fix.pending]: (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		},
		[fetchAQIByCoords_fix.fulfilled]: (
			state,
			action: PayloadAction<SetAirDataByCoords>,
		) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false

				reactotron.log("action.payload fix:", action.payload) // ? debug

				// TODO: split this out into selector
				const { city } = action.payload

				state.currentLocation = getCity(city)
				airDataSlice.caseReducers.setAirData(state, action)
			}
		},
		[fetchAQIByCoords_fix.rejected]: (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.error = action.error
				state.loading = false
			}
		},
		/**
		 * fetch AQI by city
		 */
		[fetchAQIByCity.pending]: (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		},
		[fetchAQIByCity.fulfilled]: (
			state,
			action: PayloadAction<SetAirDataByCity>,
		) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false
				airDataSlice.caseReducers.setAirData(state, action)
			}
		},
		[fetchAQIByCity.rejected]: (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.error = action.error
				state.loading = false
			}
		},
	},
})
