import React from "react"
import {
	AirDataState_I,
	configureStore,
	LocationState_I,
} from "@reduxjs/toolkit"
import { Provider } from "react-redux"
// import reducers / hooks
import { locationSlice } from "./slices/locationSlice"
import { airDataSlice } from "./slices/airDataSlice"
// import types
import { Provider_I } from "../@types"

// ************
// store
// ************

// TODO: need to figure out how to preload state from query
export const store = configureStore({
	reducer: {
		location: locationSlice.reducer as LocationState_I,
		airData: airDataSlice.reducer as AirDataState_I,
	},
})

// ************
// provider
// ************

export function ReduxProvider({ children }: Provider_I) {
	return <Provider store={store}>{children}</Provider>
}
