import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { RootNavigator } from "./stacks"

// ************
// navigation
// ************

export function Navigation() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	)
}

export * from "./actions"
export * from "./components"
export * from "./config"
export * from "./modals"
export * from "./stacks"
