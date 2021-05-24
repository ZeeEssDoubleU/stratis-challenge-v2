import { useReduxDispatch, useReduxSelector } from "./useReduxFunctions"
import { reduxLocationSlice } from "../slices"
import { FormatLocation_I } from "@hooks"

// ************
// hook
// ************

export function useReduxLocationSlice() {
	const dispatch = useReduxDispatch()
	const { setLocation, setError, setLoading } = reduxLocationSlice.actions

	return {
		// selectors
		location: useReduxSelector((state) => state.location.current),
		locationLoading: useReduxSelector((state) => state.location.loading),
		// actions
		setReduxLocation: (action: FormatLocation_I) => {
			dispatch(setLocation(action))
		},
		setReduxLocationError: (action: string) => {
			dispatch(setError(action))
		},
		setReduxLocationLoading: (action: boolean) => {
			dispatch(setLoading(action))
		},
	}
}
