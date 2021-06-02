import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { useAirDataSelectors_fix } from '../../redux/airDataSlice_fix';
import { AppText } from '../AppText';
import { Header } from '../Header';
import { AirDataTile } from './AirDataTile';

// ************
// component
// ************

export function AirDataCurrent() {
	const { currentLocation, stationByLocation, timeByLocation } =
		useAirDataSelectors_fix()

	const location = stationByLocation(currentLocation)
	const time = timeByLocation(currentLocation)

	return !location ? null : (
		<Container>
			<Header
				align="center"
				title={location.city}
				titleCategory="h3"
				subtitle={location.station}
			/>
			<AppText category="s1">{`${time.date} @ ${time.time}`}</AppText>
			<AirDataTile location={currentLocation} />
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
