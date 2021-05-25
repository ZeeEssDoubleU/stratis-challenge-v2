import * as eva from "@eva-design/eva"
import { useColorScheme } from "@hooks"
import { SCProvider } from "@styles"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ReduxProvider } from "./src/redux/configStore"
import { Navigation } from "./src/navigation/index"

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
