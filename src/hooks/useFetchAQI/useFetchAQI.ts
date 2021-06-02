import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAQIByCoords_fix } from '../../redux/airDataSlice_fix';
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

	/**
	 * fetch aqi data if new location present
	 */
	useEffect(() => {
		if (coordinates) {
			dispatch(fetchAQIByCoords_fix(coordinates))
			// TODO: replace when fixed
			// dispatch(fetchAQIByCity_fix("boston"))
			// dispatch(fetchAQIByCity_fix("shanghai"))
		}
	}, [coordinates])
}
