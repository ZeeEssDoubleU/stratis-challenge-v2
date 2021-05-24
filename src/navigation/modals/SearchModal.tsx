import { Layout, Text } from "@ui-kitten/components"
import * as React from "react"

// ************
// modal
// ************

export function SearchModal() {
	return (
		<Layout
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text style={{ fontSize: 30 }}>Search here!</Text>
		</Layout>
	)
}
