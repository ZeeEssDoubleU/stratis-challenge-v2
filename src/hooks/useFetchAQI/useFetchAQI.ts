import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAQIByCoords } from '../../redux/airDataSlice/reduxAirDataSlice';
import {
    useLocationReducers
} from '../../redux/locationSlice/useLocationReducers';

// ************
// hook
// ************

/**
 * hook that encapsulates fetchAQI functions
 * @returns fetchAQI functions
 */
export function useFetchAQI() {
	const dispatch = useDispatch()
	const { location } = useLocationReducers()
	const { latitude, longitude, timestamp } = location
	const city = "dallas"

	// effect fires if lat and long coordinates have been updated in location services
	useEffect(() => {
		dispatch(fetchAQIByCoords({ latitude, longitude }))
	}, [latitude, longitude])

	// TODO: implement the ability to search by city
	// // effect fires fetch if city search has been submitted
	// // ! not necessary as the function can be used directly
	// useEffect(() => {
	// 	handlefetchAQIByCity(city)
	// }, [city])
}
