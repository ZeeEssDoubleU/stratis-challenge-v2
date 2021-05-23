import { useAppDispatch, useAppSelector } from "."
// slices
import { airDataSlice } from "../slices/airDataSlice"
// types
import { AirData_I } from "../../utils"

// ************
// hook
// ************

export function useAirDataSlice() {
	const dispatch = useAppDispatch()
	const { setData } = airDataSlice.actions

	return {
		// selectors
		location: useAppSelector((state) => state.airData.location),
		current: useAppSelector((state) => state.airData.current),
		forecast: useAppSelector((state) => state.airData.forecast),
		// actions
		setData: (action: AirData_I) => {
			dispatch(setData(action))
		},
	}
}
