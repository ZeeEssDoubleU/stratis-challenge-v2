import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ApplicationProvider } from "@ui-kitten/components"
import * as eva from "@eva-design/eva"

import { useCachedResources } from "./src/hooks/useCachedResources"
import { useColorScheme } from "./src/hooks/useColorScheme"

import { ReduxProvider } from "./src/redux"

import { CurrentLocationScreen } from "./src/screens/CurrentLocationScreen"

// ************
// component
// ************

export default function App() {
	const isLoadingComplete = useCachedResources()
	// gets preferred light/dark color scheme
	const colorScheme = useColorScheme()

	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<ReduxProvider>
				{/* uses app preference to determine correct eva color scheme */}
				<ApplicationProvider {...eva} theme={eva[colorScheme]}>
					<SafeAreaProvider>
						<CurrentLocationScreen />
						<StatusBar />
					</SafeAreaProvider>
				</ApplicationProvider>
			</ReduxProvider>
		)
	}
}
