import { createSelector } from 'reselect';

import { RootState_Type, useReduxSelector } from '../store';

// ************
// selectors
// ************

export const locationState = (state: RootState_Type) => state.location
export const selectLocation = createSelector(
	locationState,
	(state) => state.current,
)
export const selectCoordinates = createSelector(selectLocation, (state) => {
	if (state.coords) {
		return {
			latitude: state.coords.latitude,
			longitude: state.coords.longitude,
		}
	}
})
export const selectLocationLoading = createSelector(
	locationState,
	(state) => state.loading,
)

// ************
// hook
// ************

export function useLocationSelectors() {
	return {
		// selectors
		location: useReduxSelector(selectLocation),
		coordinates: useReduxSelector(selectCoordinates),
		locationLoading: useReduxSelector(selectLocationLoading),
	}
}
