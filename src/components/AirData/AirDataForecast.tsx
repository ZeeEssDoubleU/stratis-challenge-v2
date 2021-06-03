import React from 'react';
import { ScaledSize, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { AirDataCard } from './';

// ************
// component
// ************

export function AirDataForecast() {
	const window = useWindowDimensions()

	return (
		<Container
			horizontal
			contentOffset={{ x: 355 - 20 - 20, y: 0 }}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			{...{ window }}
		>
			<AirDataCard selectedDay="yesterday" />
			<AirDataCard selectedDay="today" />
			<AirDataCard selectedDay="tomorrow" />
		</Container>
	)
}

// ************
// styles
// ************

export const Container = styled(ScrollView)<ScaledSize>`
	position: absolute;
	top: ${({ window }) => `${window.height - 525}px`};
`
