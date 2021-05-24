import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { CurrentLocationScreen } from "@screens"

// ************
// stack
// ************

const Stack = createStackNavigator()

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

// ************
// root navigator
// ************

export function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Current Location"
				component={CurrentLocationScreen}
			/>
		</Stack.Navigator>
	)
}
