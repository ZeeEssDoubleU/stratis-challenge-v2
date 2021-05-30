import * as Location from 'expo-location';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ************
// types
// ************

export interface LocationState_I {
	current: Location.LocationObject
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
export const fetchCurrentLocation = createAsyncThunk(
	"location/fetchCurrentLocation",
	async (location = {}, thunkAPI) => {
		const { status } = await Location.requestForegroundPermissionsAsync()

		if (status === "granted") {
			const response = await Location.getCurrentPositionAsync(location)
			return response
		} else {
			thunkAPI.rejectWithValue("Permission to use location not granted.")
		}
	},
)

// ************
// init state)
// ************

const initialState = {
	current: {},
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
