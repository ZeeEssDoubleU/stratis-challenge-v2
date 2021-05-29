import { useReduxSelector } from '../store';

// ************
// hook
// ************

export function useLocationReducers() {
	return {
		// selectors
		location: useReduxSelector((state) => state.location.current),
		locationLoading: useReduxSelector((state) => state.location.loading),
	}
}
