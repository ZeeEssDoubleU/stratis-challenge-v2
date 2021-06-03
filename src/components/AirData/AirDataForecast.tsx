import React from 'react';
import { ScaledSize, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { useAirDataSelectors_fix } from '../../redux/airDataSlice_fix';
import { AirDataCard } from './';

// ************
// component
// ************

export function AirDataForecast() {
	const window = useWindowDimensions()
	const { currentLocation } = useAirDataSelectors_fix()

	return (
		<Container
			horizontal
			contentOffset={{ x: 355 - 20 - 20, y: 0 }}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			{...{ window }}
		>
			<AirDataCard location={currentLocation} selectedDay="yesterday" />
			<AirDataCard location={currentLocation} selectedDay="today" />
			<AirDataCard location={currentLocation} selectedDay="tomorrow" />
		</Container>
	)
}

// ************
// styles
// ************

export const Container = styled(ScrollView)<ScaledSize>`
	position: absolute;
	top: ${({ window }) => `${window.height - 550}px`};
`
