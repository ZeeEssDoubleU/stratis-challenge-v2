import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetCurrentLocation } from '../../hooks/useGetLocation';

// ************
// types
// ************

export interface LocationState_I {
	city: string
	current: SetCurrentLocation
	error: string
	loading: boolean
}

// ************
// init state
// ************

const initialState = {
	city: "", // TODO: implement city search
	current: {},
	error: "", // ! not used
	loading: true,
} as LocationState_I

// ************
// slice
// ************

export const reduxLocationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		setLocation: (state, action: PayloadAction<SetCurrentLocation>) => {
			state.current = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		},
	},
})
