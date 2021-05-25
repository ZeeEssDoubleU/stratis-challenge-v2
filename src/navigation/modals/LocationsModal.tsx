import { AppText } from "@components"
import { Layout } from "@ui-kitten/components"
import * as React from "react"
import { GoBack, OpenModal } from "../actions"
import { TopNavWrapper } from "../components"

// ************
// modal
// ************

export function LocationsModal({ navigation }: { navigation: NavigationType }) {
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
