import React, { ReactElement } from "react"
import { SafeAreaView } from "react-native"
import styled from "styled-components"
import {
	Divider,
	Layout,
	TopNavigation,
	TopNavigationActionProps,
	TopNavigationElement,
} from "@ui-kitten/components"

// ************
// component
// ************

export function TopNavWrapper(props: TopNavigationElement) {
	return (
		<Container>
			<TopNavigation {...props} />
			<Divider />
			<Wrapper>{props.children}</Wrapper>
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
`
