import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAQIByCoords } from '../../redux/airDataSlice';
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
			dispatch(
				fetchAQIByCoords({
					search: "current location",
					...coordinates,
				}),
			)
		}
	}, [coordinates])
}
