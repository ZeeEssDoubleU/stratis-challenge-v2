import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Spinner } from '@ui-kitten/components';

// ************s
// component
// ************

export function Loading() {
	return (
		<Container>
			<Spinner />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`
