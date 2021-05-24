import * as React from "react"

import { useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { CurrentLocationScreen } from "@screens"

import { LocationsModal, SearchModal } from "../modals"

// ************
// stack
// ************

const { Navigator, Screen } = createStackNavigator()

export function MainNavigator() {
	return (
		<Navigator mode="modal" headerMode="none">
			<Screen name="Current Location" component={CurrentLocationScreen} />
			<Screen name="Locations Modal" component={LocationsModal} />
			<Screen name="Search Modal" component={SearchModal} />
		</Navigator>
	)
}
