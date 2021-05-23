import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UseLocation_I } from "hooks"

// ************
// types
// ************

export interface LocationState_I {
	city: string | null
	current: UseLocation_I | null
}

// ************
// init state
// ************

const initialState: LocationState_I = {
	city: null,
	current: null,
}

// ************
// slice
// ************

export const locationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		setLocation: (state, action: PayloadAction<UseLocation_I>) => {
			state.current = action.payload
		},
	},
})
