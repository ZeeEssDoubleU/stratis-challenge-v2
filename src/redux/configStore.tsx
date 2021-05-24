import React from "react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
// import reducers / hooks
import { reduxLocationSlice } from "./slices/reduxLocationSlice"
import { reduxAirDataSlice } from "./slices/reduxAirDataSlice"
import { Provider_I } from "global"
// import types

// ************
// store
// ************

// TODO: need to figure out how to preload state from query
export const store = configureStore({
	reducer: {
		location: reduxLocationSlice.reducer,
		airData: reduxAirDataSlice.reducer,
	},
})

// ************
// provider
// ************

export function ReduxProvider({ children }: Provider_I) {
	return <Provider store={store}>{children}</Provider>
}
