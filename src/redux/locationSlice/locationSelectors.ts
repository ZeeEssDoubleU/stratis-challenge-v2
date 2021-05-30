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
		const { latitude, longitude } = state.coords
		return {
			latitude,
			longitude,
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
