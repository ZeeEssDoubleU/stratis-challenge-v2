import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Layout } from '@ui-kitten/components';

import { useAirDataSelectors_fix } from '../../redux/airDataSlice_fix';
import { RelativeDay } from '../../utils';
import { AppText } from '../AppText';
import { AirDataRow } from './AirDataRow';

// ************
// component
// ************

export function AirData({ selectedDay }: { selectedDay: RelativeDay }) {
	const { selectedLocation, forecastByLocationDayArray } =
		useAirDataSelectors_fix()
	const forecast = forecastByLocationDayArray(selectedLocation, selectedDay)

	const keysToDisplay = ["", "avg", "max", "min"].sort((a, b) => a[0] - b[0])

	const displayKeys = keysToDisplay.map((key) => (
		<Keys key={`key-${key}`}>
			<AppText>{key}</AppText>
		</Keys>
	))

	const displayForecasts = forecast.map(([param, estimate]) => {
		return <AirDataRow key={param} {...{ param, estimate }} />
	})

	return !forecast ? null : (
		<Container>
			<KeysWrapper>{displayKeys}</KeysWrapper>
			{displayForecasts}
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
const Box = styled(Layout)`
	height: 40px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex: 1;
`
const Keys = styled(Box)`
	flex: 1;
`
const KeysWrapper = styled(View)`
	flex: 1;
	flex-direction: row;
`
