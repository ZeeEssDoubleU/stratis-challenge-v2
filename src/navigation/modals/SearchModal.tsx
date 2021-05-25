import * as React from "react"

import { AppText } from "@components"
import { Layout } from "@ui-kitten/components"

import { GoBack } from "../actions"
import { TopNavWrapper } from "../components"

// ************
// modal
// ************

export function SearchModal({ navigation }: { navigation: NavigationType }) {
	return (
		<TopNavWrapper {...{ navigation }} accessoryLeft={GoBack}>
			<Layout>
				<AppText>This is a search modal!</AppText>
			</Layout>
		</TopNavWrapper>
	)
}
