import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { useAirDataSelectors } from '../../redux/airDataSlice';
import { titleCase } from '../../utils/formatText';
import { AppText } from '../AppText';
import { Header } from '../Header';
import { AirDataTile } from './AirDataTile';

// ************
// component
// ************

export function AirDataCurrent() {
	const { selectedLocation, stationByLocation, timeByLocation } =
		useAirDataSelectors()

	const location = stationByLocation(selectedLocation)
	const time = timeByLocation(selectedLocation)

	return !location ? null : (
		<Container>
			<Header
				align="center"
				title={titleCase(selectedLocation)}
				titleCategory="h3"
				subtitle={titleCase(location.full)}
			/>
			<AppText category="s1">{`${time.date} @ ${time.time}`}</AppText>
			<AirDataTile location={selectedLocation} />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(View)`
	z-index: 10;
	top: 20px;
	align-items: center;
	justify-content: center;
`
