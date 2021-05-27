import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { useReduxAirDataSlice, useReduxLocationSlice } from '../redux/hooks';
import { useGetLocation } from './useGetLocation';

// ************
// hook
// ************

export function useCachedResources() {
	const { airDataLoading } = useReduxAirDataSlice()
	const { locationLoading } = useReduxLocationSlice()
	const [resourcesLoading, setResourcesLoading] = useState(true)
	const [isAppReady, setAppReady] = useState(false)

	/**
	 * get current gps location data
	 */
	useGetLocation()

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
