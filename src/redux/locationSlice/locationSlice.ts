import * as Location from 'expo-location';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ************
// types
// ************

export interface LocationState_I {
	city: string
	current: SetCurrentLocation
	permission: string
	error: string
	loading: boolean
	currentRequestId: number | undefined
}

// ************
// thunk
// ************

/**
 * function gets current users location asynchronously and returns a promist with formatted responses
 */
export const requestLocationPermission = createAsyncThunk(
	"location/requestLocationPermission",
	async (request: void, thunkAPI) => {
		const { status } = await Location.requestForegroundPermissionsAsync(
			request,
		)

		if (status === "granted") {
			thunkAPI.dispatch(fetchCurrentLocation())
		}

		return status
	},
)

// ************
// thunk
// ************

/**
 * function gets current users location asynchronously and returns a promist with formatted responses
 */
export const fetchCurrentLocation = createAsyncThunk(
	"location/fetchCurrentLocation",
	async (location: void) => {
		const response = await Location.getCurrentPositionAsync({})

		return response
	},
)

// ************
// init state)
// ************

const initialState = {
	citiesIndex: [], // TODO: implement city search
	current: {},
	permission: "",
	error: "",
	loading: false,
	currentRequestId: undefined,
} as LocationState_I

// ************
// slice
// ************

export const locationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {},
	extraReducers: {
		/**
		 * location permission
		 */
		[requestLocationPermission.pending]: (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		},
		[requestLocationPermission.fulfilled]: (
			state,
			action: PayloadAction<Location.PermissionStatus>,
		) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false
				state.permission = action.payload
			}
		},
		[requestLocationPermission.rejected]: (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.permission = action.payload
				state.loading = false
				state.error = action.error
			}
		},

		/**
		 * current location
		 */
		[fetchCurrentLocation.pending]: (state, action) => {
			state.loading = true
			state.currentRequestId = action.meta.requestId
		},
		[fetchCurrentLocation.fulfilled]: (
			state,
			action: PayloadAction<Location.LocationObject>,
		) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false
				state.current = action.payload
			}
		},
		[fetchCurrentLocation.rejected]: (state) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.loading = false
				state.error = action.error
			}
		},
	},
})
