import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { useAirDataSelectors } from '../redux/airDataSlice/airDataSelectors';
import { useAirDataSelectors_fix } from '../redux/airDataSlice_fix';
import {
    fetchCurrentLocation, useLocationSelectors
} from '../redux/locationSlice';
import { reactotron } from '../redux/middleware';
import { useReduxDispatch } from '../redux/store';
import { useFetchAQI } from './useFetchAQI';

// ************
// hook
// ************

export function useCachedResources() {
	const dispatch = useReduxDispatch()
	const { airDataLoading } = useAirDataSelectors()
	const { currentLocationAQI } = useAirDataSelectors_fix()
	const { locationLoading } = useLocationSelectors()

	const [resourcesLoading, setResourcesLoading] = useState(true)
	const [isAppReady, setAppReady] = useState(false)

	/**
	 * request permission and get location on app load
	 */
	useEffect(() => {
		dispatch(fetchCurrentLocation())
	}, [])

	useFetchAQI()

	// TODO: replace when fixed
	useEffect(() => {
		reactotron.log("currentLocationAQI:", currentLocationAQI) // ? debug
	}, [currentLocationAQI])

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
