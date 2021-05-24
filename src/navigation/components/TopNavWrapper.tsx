import React from "react"
import { SafeAreaView } from "react-native"
import styled from "styled-components"
import {
	Divider,
	Icon,
	Layout,
	TopNavigation,
	TopNavigationAction,
} from "@ui-kitten/components"

// ************
// component
// ************

export function TopNavWrapper({ children, ...props }) {
	return (
		<Container {...props}>
			<TopNavigation {...props} />
			<Divider {...props} />
			<Wrapper>{children}</Wrapper>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(SafeAreaView)`
	flex: 1;
`
const Wrapper = styled(Layout)`
	flex: 1;
	justify-content: center;
	align-items: center;
`
