import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import * as eva from "@eva-design/eva"
import { EvaIconsPack } from "@ui-kitten/eva-icons"

import { SCProvider } from "@styles"
import { ReduxProvider } from "@redux"

import { useColorScheme } from "@hooks"

import { Navigation } from "@navigation"

// ************
// component
// ************

export default function App() {
	// gets preferred light/dark color scheme
	const colorScheme = useColorScheme()

	return (
		<ReduxProvider>
			{/* uses app preference to determine correct eva color scheme */}
			<SCProvider>
				{/* needed so icons are compatible with Icon component */}
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={eva[colorScheme]}>
					<SafeAreaProvider>
						<Navigation />
						<StatusBar />
					</SafeAreaProvider>
				</ApplicationProvider>
			</SCProvider>
		</ReduxProvider>
	)
}
