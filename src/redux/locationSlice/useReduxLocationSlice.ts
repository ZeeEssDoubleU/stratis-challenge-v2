import { useReduxDispatch, useReduxSelector } from '../store';
import {
    fetchCurrentLocation, requestLocationPermission
} from './reduxLocationSlice';

// ************
// hook
// ************

export function useReduxLocationSlice() {
	const dispatch = useReduxDispatch()

	return {
		// selectors
		location: useReduxSelector((state) => state.location.current),
		locationLoading: useReduxSelector((state) => state.location.loading),
		// actions
		fetchCurrentLocation_redux: (action: void) => {
			dispatch(fetchCurrentLocation(action))
		},
		requestLocationPermission_redux: (action: void) => {
			dispatch(requestLocationPermission(action))
		},
	}
}
