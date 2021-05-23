import { StatusBar } from "expo-status-bar"
import React from "react"

import { SafeAreaProvider } from "react-native-safe-area-context"
import { ReduxProvider } from "./src/redux"

import useCachedResources from "./src/hooks/useCachedResources"

// ************
// component
// ************

export default function App() {
	const isLoadingComplete = useCachedResources()

	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<ReduxProvider>
				{/* uses color scheme to determine correct eva color scheme */}
				<SafeAreaProvider>
					<StatusBar />
				</SafeAreaProvider>
			</ReduxProvider>
		)
	}
}
