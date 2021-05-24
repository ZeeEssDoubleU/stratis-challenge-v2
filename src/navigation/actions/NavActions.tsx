import * as React from "react"
import { TopNavigationAction } from "@ui-kitten/components"
import { BackArrow, PlusOutline } from "../../components/Icons"

// ************
// actions
// ************

export const OpenModal = () => (
	<TopNavigationAction
		icon={PlusOutline}
		onPress={() => navigation.goBack()}
	/>
)

export const GoBack = () => (
	<TopNavigationAction icon={BackArrow} onPress={() => navigation.goBack()} />
)
