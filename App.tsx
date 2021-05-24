import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ApplicationProvider } from "@ui-kitten/components"
import * as eva from "@eva-design/eva"

import { useCachedResources, useColorScheme } from "@hooks"

import { SCProvider } from "@styles"
import { ReduxProvider } from "@redux"

// import { Navigation } from "@navigation"
import { CurrentLocationScreen } from "@screens"

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
				<SCProvider>
					<ApplicationProvider {...eva} theme={eva[colorScheme]}>
						<SafeAreaProvider>
							<CurrentLocationScreen />
							<StatusBar />
						</SafeAreaProvider>
					</ApplicationProvider>
				</SCProvider>
			</ReduxProvider>
		)
	}
}
