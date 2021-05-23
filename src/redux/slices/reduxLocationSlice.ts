import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FormatLocation_I } from "../../hooks"

// ************
// types
// ************

export interface LocationState_I {
	city: string | null
	current: FormatLocation_I | null
	error: string | null
}

// ************
// init state
// ************

const initialState: LocationState_I = {
	city: null,
	current: null,
	error: null,
}

// ************
// slice
// ************

export const reduxLocationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		setLocation: (state, action: PayloadAction<FormatLocation_I>) => {
			state.current = action.payload
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		},
	},
})
