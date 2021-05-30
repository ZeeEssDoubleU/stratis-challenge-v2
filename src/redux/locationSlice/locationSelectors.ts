import { createSelector } from 'reselect';

import { RootState_Type, useReduxSelector } from '../store';

// ************
// selectors
// ************

export const locationState = (state: RootState_Type) => state.location
export const selectLoading = createSelector(
	locationState,
	(location) => location.loading,
)
export const selectCurrent = createSelector(
	locationState,
	(location) => location.current,
)
export const selectCoordinates = createSelector(selectCurrent, (current) => {
	if (current.coords) {
		const { latitude, longitude } = current.coords
		return {
			latitude,
			longitude,
		}
	}
})

// ************
// hook
// ************

export function useLocationSelectors() {
	return {
		// selectors
		locationLoading: useReduxSelector(selectLoading),
		location: useReduxSelector(selectCurrent),
		coordinates: useReduxSelector(selectCoordinates),
	}
}
