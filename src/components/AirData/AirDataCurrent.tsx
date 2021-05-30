import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { useAirDataSelectors } from '../../redux/airDataSlice/airDataSelectors';
import { AirDataStateCurrent_I } from '../../redux/airDataSlice/airDataSlice';
import { AppText } from '../AppText';
import { Header } from '../Header';
import { AirDataTile } from './AirDataTile';

// ************
// types
// ************

export interface AirDataCurrent_I {
	airData: AirDataStateCurrent_I
}

// ************
// component
// ************

export function AirDataCurrent({ airData }: AirDataCurrent_I) {
	const { location: stationLocation } = useAirDataSelectors()

	return !stationLocation ||
		!airData ||
		typeof Object.keys(airData) === "undefined" ? null : (
		<Container>
			<Header
				align="center"
				title={stationLocation.city}
				titleCategory="h3"
				subtitle={stationLocation.station}
			/>
			{airData?.date && airData?.time && (
				<AppText category="s1">{`${airData.date} @ ${airData.time}`}</AppText>
			)}
			<AirDataTile {...{ airData }} />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(View)`
	/* position: absolute; */
	z-index: 10;
	top: 20px;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	border: none;
	/* background: lightblue; */
`
