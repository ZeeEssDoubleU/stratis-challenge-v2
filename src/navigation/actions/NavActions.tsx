import * as React from "react"
import { TopNavigationAction } from "@ui-kitten/components"
import { BackArrow, PlusOutline } from "../../components/Icons"
import { useNavigation } from "@react-navigation/core"

// ************
// actions
// ************

export const OpenModal = (targetModal) => {
	const navigation = useNavigation()

	return (
		<TopNavigationAction
			icon={PlusOutline}
			onPress={() => navigation.navigate(targetModal)}
		/>
	)
}

export const GoBack = () => {
	const navigation = useNavigation()

	return (
		<TopNavigationAction
			icon={BackArrow}
			onPress={() => navigation.goBack()}
		/>
	)
}
