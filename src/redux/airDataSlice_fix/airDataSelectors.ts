import { createSelector } from 'reselect';

import { RootState_Type, useReduxSelector } from '../store';

// ************
// selectors
// ************

export const airDataState = (state: RootState_Type) => state.airData_fix
export const selectLoading = createSelector(
	airDataState,
	(airData) => airData.loading,
)
export const selectCurrentLocation = createSelector(
	airDataState,
	(airData) => airData.currentLocation,
)
export const selectAQIByLocation = createSelector(
	airDataState,
	(airData) => airData.airDataByLocation,
)
export const selectAQILocation = createSelector(
	selectCurrentLocation,
	selectAQIByLocation,
	(currentLocation, aqiByLocation) => aqiByLocation[currentLocation],
)

// ************
// function
// ************

export const getCity = (city) => city.name.split(",")[1].trim()

// ************
// hook
// ************

export function useAirDataSelectors_fix() {
	return {
		// selectors
		airDataLoading: useReduxSelector(selectLoading),
		currentLocation: useReduxSelector(selectCurrentLocation),
		currentLocationAQI: useReduxSelector(selectAQILocation),
	}
}
