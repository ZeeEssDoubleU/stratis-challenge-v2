import { useReduxDispatch, useReduxSelector } from "./useReduxFunctions"
import { reduxAirDataSlice } from "../slices"
import { FetchAirData_I } from "@utils"

// ************
// hook
// ************

export function useReduxAirDataSlice() {
	const dispatch = useReduxDispatch()
	const { setAirData } = reduxAirDataSlice.actions

	return {
		// selectors
		location: useReduxSelector((state) => state.airData.location),
		current: useReduxSelector((state) => state.airData.current),
		forecast: useReduxSelector((state) => state.airData.forecast),
		// actions
		setReduxAirData: (action: FetchAirData_I) => {
			dispatch(setAirData(action))
		},
	}
}
