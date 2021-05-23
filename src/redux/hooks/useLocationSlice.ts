import { useAppDispatch, useAppSelector } from "."
// import slice
import { locationSlice } from "../slices/locationSlice"
// import types
import { LocationObject } from "expo-location"

// ************
// hook
// ************

export function useLocationSlice() {
	const dispatch = useAppDispatch()
	const { setLocation } = locationSlice.actions

	return {
		// selectors
		location: useAppSelector((state) => state.location.current),
		// actions
		setLocation: (action: LocationObject) => {
			dispatch(setLocation(action))
		},
	}
}
