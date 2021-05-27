import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainNavigator } from './MainStack';

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
// stack
// ************

const { Navigator, Screen } = createStackNavigator()

export function RootNavigator() {
	return (
		<Navigator>
			<Screen
				name="Current"
				component={MainNavigator}
				options={{ headerShown: false }}
			/>
		</Navigator>
	)
}
