import * as React from "react"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Button, Text, View } from "react-native"

import { CurrentLocationScreen } from "@screens"
import { AnotherLocationScreen } from "@screens"

// ************
// navigation
// ************

export function Navigation() {
	return (
		<NavigationContainer>
			<RootStackScreen />
		</NavigationContainer>
	)
}

// ************
// modal
// ************

const RootStack = createStackNavigator()

function RootStackScreen() {
	return (
		<RootStack.Navigator>
			<RootStack.Screen
				name="Current"
				component={MainStackScreen}
				options={{ headerShown: false }}
			/>
		</RootStack.Navigator>
	)
}

function LocationsModal() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontSize: 30 }}>This is a modal!</Text>
		</View>
	)
}
function SearchModal() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontSize: 30 }}>Search here!</Text>
		</View>
	)
}

// ************
// stack
// ************

const MainStack = createStackNavigator()

export function MainStackScreen() {
	const navigation = useNavigation()

	return (
		<MainStack.Navigator mode="modal">
			<MainStack.Screen
				name="CurrentLocation"
				component={CurrentLocationScreen}
				options={{
					headerRight: () => (
						<Button
							onPress={() => navigation.navigate("AddModal")}
							title="Add"
						/>
					),
				}}
			/>
			<RootStack.Screen
				name="AddModal"
				component={LocationsModal}
				options={{
					headerRight: () => (
						<Button
							onPress={() => navigation.navigate("SearchModal")}
							title="Search"
						/>
					),
				}}
			/>
			<RootStack.Screen
				name="SearchModal"
				component={SearchModal}
				options={{
					headerRight: () => (
						<Button
							onPress={() => navigation.goBack("")}
							title="Cancel"
						/>
					),
				}}
			/>
		</MainStack.Navigator>
	)
}
