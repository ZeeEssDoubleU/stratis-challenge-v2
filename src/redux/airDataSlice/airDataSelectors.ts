import { useReduxSelector } from '../store';

// ************
// hook
// ************

export function useAirDataSelectors() {
	return {
		// selectors
		location: useReduxSelector((state) => state.airData.location),
		current: useReduxSelector((state) => state.airData.current),
		forecast: useReduxSelector((state) => state.airData.forecast),
		airDataLoading: useReduxSelector((state) => state.airData.loading),
	}
}
