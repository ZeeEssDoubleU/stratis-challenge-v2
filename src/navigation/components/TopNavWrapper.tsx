import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import {
    Divider, Layout, TopNavigation, TopNavigationElement
} from '@ui-kitten/components';

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
