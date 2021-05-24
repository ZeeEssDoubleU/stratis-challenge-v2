import React, { ReactElement } from "react"
import styled from "styled-components/native"
import { View } from "react-native"
import { Spinner } from "@ui-kitten/components"

// ************
// types
// ************

export interface WaitFor_I {
	element: boolean
	children: ReactElement | ReactElement[]
}

// ************s
// component
// ************

export function WaitFor({ element = false, children }: WaitFor_I) {
	// console.log("children:", children) // ? debug

	const display = !element ? <Spinner /> : children

	return <Container>{display}</Container>
}

// ************
// styles
// ************

const Container = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`
