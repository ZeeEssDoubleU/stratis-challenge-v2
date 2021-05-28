import React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { TopNavigation, TopNavigationElement } from '@ui-kitten/components';

// ************
// component
// ************

export function TopNavWrapper(props: TopNavigationElement) {
	const window = useWindowDimensions()

	return (
		<Container {...{ window }}>
			<TopNavigation {...{ window, ...props }} />
			{/* <Divider /> */}
			<FlexWrapper>{props.children}</FlexWrapper>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(SafeAreaView)`
	flex: 1;
	height: 100%;
`
const FlexWrapper = styled(ScrollView)`
	flex: 1;
	height: 100%;
`
