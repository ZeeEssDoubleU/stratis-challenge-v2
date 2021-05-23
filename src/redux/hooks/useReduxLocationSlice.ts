import { useReduxDispatch, useReduxSelector } from "./useReduxFunctions"
// import slice
import { reduxLocationSlice } from "../slices/reduxLocationSlice"
// import types
import { FormatLocation_I } from "src/hooks"

// ************
// hook
// ************

export function useReduxLocationSlice() {
	const dispatch = useReduxDispatch()
	const { setLocation, setError } = reduxLocationSlice.actions

	return {
		// selectors
		location: useReduxSelector((state) => state.location.current),
		// actions
		setReduxLocation: (action: FormatLocation_I) => {
			dispatch(setLocation(action))
		},
		setReduxLocationError: (action: string) => {
			dispatch(setError(action))
		},
	}
}
