import axios from 'axios';
import { AQICN_TOKEN as token } from 'react-native-dotenv';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { airDataByCity } from '../../hooks/useFetchAQI/mockData/airDataByCity';
import {
    airDatabyCoords
} from '../../hooks/useFetchAQI/mockData/airDatabyCoords';
import { reactotron } from '../middleware';
import { getCity } from './airDataSelectors';

// ************
// types
// ************

export type AirData_fix = AirDataByCity_fix | AirDataByCoords_fix
export interface AirDataState_I_fix {
	selectedLocation: string
	successfulSearches: { search: string; result: string }[]
	searchMap: { [search: string]: string }
	airDataByLocation: {
		[location: string]: AirData_fix
	}
	loading: boolean
	currentRequestId?: number
}

// ************
// thunk
// ************

export type AirDataByCity_fix = typeof airDataByCity["data"]["data"]
export type FetchAirDataByCity_fix = typeof fetchAQIByCity_fix

interface FetchAQIDataByCity_I_fix {
	search: string
}

/**
 * async fetches AQI data by city
 * @param {string} city
 * @returns {object} AQI data object
 */
// TODO: replace when fixed
export const fetchAQIByCity_fix = createAsyncThunk(
	"airData/fetchAQIByCity_fix",
	async ({ search }: FetchAQIDataByCity_I_fix, thunkAPI) => {
		const {
			data: { data },
		} = await axios({
			method: `GET`,
			url: `https://api.waqi.info/feed/${search}/?token=${token}`,
		})

		return data as AirDataByCity_fix
	},
)

// ************
// thunk
// ************

export type AirDataByCoords_fix = typeof airDatabyCoords["data"]["data"]
export type FetchAirDataByCoords_fix = typeof fetchAQIByCoords_fix

interface FetchAQIDataByCoords_I_fix {
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
// TODO: replace when fixed
export const fetchAQIByCoords_fix = createAsyncThunk(
	"airData_fix/fetchAQIByCoords_fix",
	async ({
		search = "current location",
		latitude,
		longitude,
	}: FetchAQIDataByCoords_I_fix) => {
		// ! used mock data to model type
		const {
			data: { data },
		} = await axios({
			method: `GET`,
			url: `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${token}`,
		})

		return data as AirDataByCoords_fix
	},
)

// ************
// init state
// ************

const initialState: AirDataState_I_fix = {
	selectedLocation: "",
	successfulSearches: [],
	searchMap: {},
	airDataByLocation: {},
	loading: false,
	currentRequestId: undefined,
}

// ************
// helpers
// ************

/**
 * returns formatted city name
 * @param {object} airData - airData action payload from fetchAQIByCity_fix.fulfilled or fetchAQIByCoords_fix.fulfilled reducers
 * @returns {string} city name
 */
export const selectCity = (airData: AirData_fix) => {
	const cityArr = airData.city.name.split(",")

	const formatCity = getCity(cityArr).toLowerCase()

	return formatCity
}

// ************
// slice
// ************

export const airDataSlice = createSlice({
	name: "airData_fix",
	initialState,
	reducers: {
		setAirData: (state, action: PayloadAction<AirData_fix>) => {
			const input = action.meta.arg.search.toLowerCase()
			const station = action.payload.city.name.toLowerCase()

			if (!state.searchMap[input]) {
				state.successfulSearches.push(input)
			}
			state.searchMap[input] = station
			state.airDataByLocation[station] = action.payload
		},
		setSelectedLocation: (state, action: PayloadAction<string>) => {
			reactotron.log("action:", action) // ? debug
			state.selectedLocation = action.payload
		},
	},
	extraReducers: (builder) => {
		/**
		 * fetch AQI by coords
		 */
		builder.addCase(fetchAQIByCoords_fix.pending, (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		})
		builder.addCase(fetchAQIByCoords_fix.fulfilled, (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false

				state.selectedLocation = action.meta.arg.search.toLowerCase()
				airDataSlice.caseReducers.setAirData(state, action)
			}
		})
		builder.addCase(fetchAQIByCoords_fix.rejected, (state, action) => {
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
		builder.addCase(fetchAQIByCity_fix.pending, (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		})
		builder.addCase(fetchAQIByCity_fix.fulfilled, (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false

				state.selectedLocation = action.meta.arg.search.toLowerCase()
				airDataSlice.caseReducers.setAirData(state, action)
			}
		})
		builder.addCase(fetchAQIByCity_fix.rejected, (state, action) => {
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
