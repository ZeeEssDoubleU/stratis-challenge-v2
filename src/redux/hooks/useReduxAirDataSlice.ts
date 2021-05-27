import { FetchAirDataByCoords } from '../../hooks/useFetchAQI';
import { reduxAirDataSlice } from '../slices';
import { useReduxDispatch, useReduxSelector } from './useReduxFunctions';

// ************
// hook
// ************

export function useReduxAirDataSlice() {
	const dispatch = useReduxDispatch()
	const { setData, setLoading } = reduxAirDataSlice.actions

	return {
		// selectors
		location: useReduxSelector((state) => state.airData.location),
		current: useReduxSelector((state) => state.airData.current),
		forecast: useReduxSelector((state) => state.airData.forecast),
		airDataLoading: useReduxSelector((state) => state.airData.loading),
		// actions
		setReduxAirData: (action: FetchAirDataByCoords) => {
			dispatch(setData(action))
		},
		setReduxAirDataLoading: (action: boolean) => {
			dispatch(setLoading(action))
		},
	}
}
