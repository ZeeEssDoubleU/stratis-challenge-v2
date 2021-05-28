import React from 'react';
import styled from 'styled-components/native';

import { Layout } from '@ui-kitten/components';

import { AppText } from '../AppText';

// ************
// types
// ************

export interface AirDataRow_I {
	param: string
	estimate: { avg: number; day: string; max: number; min: number }
}

// ************
// component
// ************

export function AirDataRow({ param, estimate }: AirDataRow_I): JSX.Element {
	const displayValues = Object.entries(estimate)
		.filter(([key]) => key !== "day")
		.sort((a, b) => a[0] - b[0])
		.map(([key, value]) => {
			return (
				<Box key={key} level="3">
					<AppText>{value}</AppText>
				</Box>
			)
		})

	return (
		<Container level="3">
			<Params level="3">
				<AppText category="s1">{param}</AppText>
			</Params>
			{displayValues}
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(Layout)`
	flex: 1;
	flex-direction: row;
	margin: 4px;
	padding: 0 4px;
`
const Box = styled(Layout)`
	height: 40px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex: 1;
`
const Params = styled(Layout)`
	align-items: flex-start;
	justify-content: center;
	flex: 1;
`
