import { FetchAirDataByCoords } from '../../hooks/useFetchAQI';
import { useReduxDispatch, useReduxSelector } from '../store';
import { fetchAQIByCoords, reduxAirDataSlice } from './reduxAirDataSlice';

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
		fetchAQIByCoords_redux: (action: {
			latitude: number
			longitude: number
		}) => {
			dispatch(fetchAQIByCoords(action))
		},
		// fetchAQIByCity_redux: (action: FetchAirDataByCoords) => {
		// 	dispatch(fetchAQIByCoords(action))
		// },
		setReduxAirData: (action: FetchAirDataByCoords) => {
			dispatch(setData(action))
		},
		setReduxAirData: (action: FetchAirDataByCoords) => {
			dispatch(setData(action))
		},
		setReduxAirDataLoading: (action: boolean) => {
			dispatch(setLoading(action))
		},
	}
}
