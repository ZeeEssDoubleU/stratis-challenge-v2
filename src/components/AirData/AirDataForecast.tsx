import React from 'react';
import { ScaledSize } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {
    AirDataStateCurrent_I, AirDataStateForecast_I
} from '../../redux/airDataSlice/airDataSlice';
import { AirDataCard } from './';

// ************
// types
// ************

interface AirDataForecast_I {
	window: ScaledSize
	airData: { current: AirDataStateCurrent_I; forecast: AirDataStateForecast_I }
}

// ************
// component
// ************

export function AirDataForecast({
	window,
	airData: { current, forecast },
}: AirDataForecast_I) {
	return (
		<Container
			horizontal
			contentOffset={{ x: 355 - 20 - 20, y: 0 }}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			{...{ window }}
		>
			<AirDataCard {...{ current, forecast: forecast.yesterday }} />
			<AirDataCard {...{ current, forecast: forecast.today }} />
			<AirDataCard {...{ current, forecast: forecast.tomorrow }} />
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
