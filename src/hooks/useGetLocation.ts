import { useEffect } from 'react';

import {
    requestLocationPermission
} from '../redux/locationSlice/reduxLocationSlice';
import { useReduxDispatch } from '../redux/store';

// ************
// types
// ************

export type GetCurrentLocation = ReturnType<typeof getCurrentLocation>

// ************
// hook
// ************

export function useGetLocation(): void {
	const dispatch = useReduxDispatch()

	/**
	 * get permission to use location
	 */
	async function handleRequestLocationPermission() {
		try {
			dispatch(requestLocationPermission())
		} catch (error) {
			console.error(error) // ? debug
		}
	}

	useEffect(() => {
		handleRequestLocationPermission()
	}, [])
}
