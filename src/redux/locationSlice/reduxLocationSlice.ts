import * as Location from 'expo-location';

import {
    createAsyncThunk, createSelector, createSlice, PayloadAction
} from '@reduxjs/toolkit';

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

export const reduxLocationSlice = createSlice({
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
				state.permission = action.payload
				state.loading = false
			}
		},
		[requestLocationPermission.rejected]: (state, action) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.permission = action.payload
				state.error = action.error
				state.loading = false
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
				const {
					coords: { latitude, longitude },
					timestamp,
				} = action.payload

				state.current = { latitude, longitude, timestamp }
				state.loading = false
			}
		},
		[fetchCurrentLocation.rejected]: (state) => {
			const { requestId } = action.meta
			if (state.loading === true && state.currentRequestId === requestId) {
				state.error = action.error
				state.loading = false
			}
		},

		// // ************
		// // searchable city index.  Will be used by CN aqi
		// // ************
		// // TODO: actually may be able to keep this completey in aqi reducer***

		// [getSearchLocation.pending]: (state) => {
		// 	if (!state.loading) {
		// 		state.loading = true
		// 	}
		// },
		// [getSearchLocation.fulfilled]: (
		// 	state,
		// 	action: PayloadAction<LocationObject>,
		// ) => {
		// 	if (state.loading === true) {
		// 		const {
		// 			coords: { latitude, longitude },
		// 			timestamp,
		// 		} = action.payload

		// 		cosnt = { payload } = action

		// 		// a searchable city should've return, otherwise it would have been rejected
		// 		state.cities === { ...state.cities, payload }
		// 		state.loading = false
		// 	}
		// },
		// [getSearchLocation.rejected]: (state) => {
		// 	if (state.loading === true) {
		// 		state.error = action.error
		// 		state.loading = false
		// 	}
		// },
	},
})

// ************
// selectors
// ************

export const locationState = (state: LocationState_I) => state
export const locationSelector = createSelector(
	locationState,
	(state) => state.current,
)
export const locationLoadingSelector = createSelector(
	locationState,
	(state) => state.loading,
)
