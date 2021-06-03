import axios from 'axios';
import { AQICN_TOKEN as token } from 'react-native-dotenv';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { airDataByCity } from '../../hooks/useFetchAQI/mockData/airDataByCity';
import {
    airDatabyCoords
} from '../../hooks/useFetchAQI/mockData/airDatabyCoords';
import { getCity } from './airDataSelectors';

// ************
// types
// ************

export type AirData = AirDataByCity | AirDataByCoords
export interface AirDataState_I {
	selectedLocation: string
	successfulSearches: { search: string; result: string }[]
	searchMap: { [search: string]: string }
	airDataByLocation: {
		[location: string]: AirData
	}
	loading: boolean
	currentRequestId?: number
	error: Error | string | null
}

// ************
// thunk
// ************

export type AirDataByCity = typeof airDataByCity["data"]["data"]
export type FetchAirDataByCity = typeof fetchAQIByCity

interface FetchAQIDataByCity_I {
	search: string
}

/**
 * async fetches AQI data by city
 * @param {string} city
 * @returns {object} AQI data object
 */
export const fetchAQIByCity = createAsyncThunk(
	"airData/fetchAQIByCity",
	async ({ search }: FetchAQIDataByCity_I, thunkAPI) => {
		const {
			data: { data },
		} = await axios({
			method: `GET`,
			url: `https://api.waqi.info/feed/${search}/?token=${token}`,
		})

		return data as AirDataByCity
	},
)

// ************
// thunk
// ************

export type AirDataByCoords = typeof airDatabyCoords["data"]["data"]
export type FetchAirDataByCoords = typeof fetchAQIByCoords

interface FetchAQIDataByCoords_I {
	search: "current location"
	latitude: number
	longitude: number
}

/**
 * async fetches AQI data by coordinates
 * @param {number} latitude
 * @param {number} longitude
 * @returns {object} AQI data object
 */
export const fetchAQIByCoords = createAsyncThunk(
	"airData/fetchAQIByCoords",
	async ({
		search = "current location",
		latitude,
		longitude,
	}: FetchAQIDataByCoords_I) => {
		// ! used mock data to model type
		const {
			data: { data },
		} = await axios({
			method: `GET`,
			url: `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${token}`,
		})

		return data as AirDataByCoords
	},
)

// ************
// init state
// ************

const initialState: AirDataState_I = {
	selectedLocation: "",
	successfulSearches: [],
	searchMap: {},
	airDataByLocation: {},
	loading: false,
	currentRequestId: undefined,
	error: null,
}

// ************
// helpers
// ************

/**
 * returns formatted city name
 * @param {object} airData - airData action payload from fetchAQIByCity.fulfilled or fetchAQIByCoords.fulfilled reducers
 * @returns {string} city name
 */
export const selectCity = (airData: AirData) => {
	const cityArr = airData.city.name.split(",")

	const formatCity = getCity(cityArr).toLowerCase()

	return formatCity
}

// ************
// slice
// ************

export const airDataSlice = createSlice({
	name: "airData",
	initialState,
	reducers: {
		setAirData: (state, action: PayloadAction<AirData>) => {
			const input = action.meta.arg.search.toLowerCase()
			const station = action.payload.city.name.toLowerCase()

			if (!state.searchMap[input]) {
				state.successfulSearches.push(input)
			}
			state.searchMap[input] = station
			state.airDataByLocation[station] = action.payload
		},
		setSelectedLocation: (state, action: PayloadAction<string>) => {
			state.selectedLocation = action.payload
		},
	},
	extraReducers: (builder) => {
		/**
		 * fetch AQI by coords
		 */
		builder.addCase(fetchAQIByCoords.pending, (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		})
		builder.addCase(fetchAQIByCoords.fulfilled, (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false

				state.selectedLocation = action.meta.arg.search.toLowerCase()
				airDataSlice.caseReducers.setAirData(state, action)
			}
		})
		builder.addCase(fetchAQIByCoords.rejected, (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false
				state.error = action.payload
					? action.payload.errorMessage
					: action.error
			}
		})
		/**
		 * fetch AQI by city
		 */
		builder.addCase(fetchAQIByCity.pending, (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		})
		builder.addCase(fetchAQIByCity.fulfilled, (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false

				state.selectedLocation = action.meta.arg.search.toLowerCase()
				airDataSlice.caseReducers.setAirData(state, action)
			}
		})
		builder.addCase(fetchAQIByCity.rejected, (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false
				state.error = action.payload
					? action.payload.errorMessage
					: action.error
			}
		})
	},
})
