import * as React from "react"
import { AppText } from "@components"
import { Layout } from "@ui-kitten/components"
import { TopNavWrapper } from "../components"
import { GoBack, OpenModal } from "../actions"

// ************
// modal
// ************

export function LocationsModal({ navigation }) {
	return (
		<TopNavWrapper
			{...{ navigation }}
			accessoryLeft={GoBack}
			accessoryRight={() => OpenModal("Search Modal")}
		>
			<Layout>
				<AppText>This is the locations modal!</AppText>
			</Layout>
		</TopNavWrapper>
	)
}
