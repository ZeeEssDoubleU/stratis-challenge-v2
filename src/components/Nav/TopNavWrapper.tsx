import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import { Divider, Layout, TopNavigation } from '@ui-kitten/components';

// ************
// component
// ************

export function TopNavWrapper(props) {
	return (
		<Container>
			<SafeArea>
				<TopNavigation {...props} />
				<Divider />
				{props.children}
			</SafeArea>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(Layout)`
	flex: 1;
`
const SafeArea = styled(SafeAreaView)`
	flex: 1;
`
