import React from 'react';
import styled from 'styled-components/native';

import { Layout } from '@ui-kitten/components';

import { AppText } from '../AppText';

// ************
// component
// ************

export function AirDataTileRow({
	param,
	value,
}: {
	param: string
	value: string
}): JSX.Element {
	return (
		<Container level="3">
			<AppText category="s1">{param}</AppText>
			<AppText>{value}</AppText>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(Layout)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 4px;
	padding: 8px;
`
