import * as React from "react"
import { AppText } from "@components"
import { Layout } from "@ui-kitten/components"
import { TopNavWrapper } from "../components"
import { GoBack } from "../actions"

// ************
// modal
// ************

export function SearchModal({ navigation }) {
	return (
		<TopNavWrapper {...{ navigation }} accessoryLeft={GoBack}>
			<Layout>
				<AppText>This is a search modal!</AppText>
			</Layout>
		</TopNavWrapper>
	)
}
