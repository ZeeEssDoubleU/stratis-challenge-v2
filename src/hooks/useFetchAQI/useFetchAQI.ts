import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAQIByCoords } from '../../redux/airDataSlice/airDataSlice';
import {
    useLocationSelectors
} from '../../redux/locationSlice/locationSelectors';

// ************
// hook
// ************

/**
 * hook that encapsulates fetchAQI functions
 * @returns fetchAQI functions
 */
export function useFetchAQI() {
	const dispatch = useDispatch()
	const { coordinates } = useLocationSelectors()
	const { latitude, longitude } = coordinates

	/**
	 * fetch aqi data if new location present
	 */
	useEffect(() => {
		if (latitude && longitude) {
			dispatch(fetchAQIByCoords({ latitude, longitude }))
		}
	}, [latitude, longitude])
}
