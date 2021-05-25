import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { MainNavigator } from './MainStack';

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
