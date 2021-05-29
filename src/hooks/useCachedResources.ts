import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import reactotron from 'reactotron-react-native';

import { Ionicons } from '@expo/vector-icons';

import {
    useReduxAirDataSlice
} from '../redux/airDataSlice/useReduxAirDataSlice';
import {
    locationSelector, requestLocationPermission
} from '../redux/locationSlice/reduxLocationSlice';
import {
    useLocationReducers
} from '../redux/locationSlice/useLocationReducers';
import { useReduxDispatch } from '../redux/store';
import { useFetchAQI } from './useFetchAQI/useFetchAQI';

// ************
// hook
// ************

export function useCachedResources() {
	const dispatch = useReduxDispatch()
	const { airDataLoading } = useReduxAirDataSlice()
	const { locationLoading } = useLocationReducers()
	const [resourcesLoading, setResourcesLoading] = useState(true)
	const [isAppReady, setAppReady] = useState(false)

	/**
	 * request permission and get location on app load
	 */
	useEffect(() => {
		dispatch(requestLocationPermission())
	}, [])

	/**
	 * fetch aqi data if new location present
	 */
	useEffect(() => {
		reactotron.warn("locationSelector:", locationSelector) // ? debug
		// dispatch(fetchAQIByCoords)
	}, [locationSelector])

	useFetchAQI()

	/**
	 * effect controls splash screen display
	 */
	useEffect(() => {
		isAppReady
			? SplashScreen.hideAsync()
			: SplashScreen.preventAutoHideAsync()
	}, [isAppReady])

	/**
	 * effect declares when all resource are loaded
	 */
	useEffect(() => {
		if (!airDataLoading && !locationLoading && !resourcesLoading) {
			setAppReady(true)
		}
	}, [airDataLoading, locationLoading, resourcesLoading])

	/**
	 * effect loads pre-render resources
	 */
	useEffect(() => {
		async function loadResources() {
			try {
				// load fonts
				await Font.loadAsync({
					...Ionicons.font,
					"space-mono": require("../../assets/fonts/SpaceMono-Regular.ttf"),
				})
				setResourcesLoading(false)
			} catch (error) {
				console.warn(error) // might report to error logging
			}
		}

		loadResources()
	}, [])

	return { isAppReady }
}
