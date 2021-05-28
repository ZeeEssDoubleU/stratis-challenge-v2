import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { CurrentLocationScreen } from '../../screens/CurrentLocationScreen';
import { SearchModal } from '../modals/SearchModal';

// ************
// stack
// ************

const { Navigator, Screen } = createStackNavigator()

export function MainNavigator() {
	return (
		<Navigator mode="modal" headerMode="none">
			<Screen name="Current Location" component={CurrentLocationScreen} />
			<Screen name="Search Modal" component={SearchModal} />
		</Navigator>
	)
}
