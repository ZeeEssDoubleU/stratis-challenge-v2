import React from 'react';
import { View } from 'react-native';
import reactotron from 'reactotron-react-native';
import styled from 'styled-components/native';

import { Layout } from '@ui-kitten/components';

import { useAirDataSelectors_fix } from '../../redux/airDataSlice_fix';
import { AppText } from '../AppText';
import { AirDataRow } from './AirDataRow';

// ************
// component
// ************

const displayKeys = ["", "avg", "max", "min"].sort((a, b) => a[0] - b[0])

export function AirData({
	location,
	selectedDay,
}: {
	location: string
	selectedDay: RelativeDay
}) {
	const { forecastByLocationDayParam } = useAirDataSelectors_fix()
	const forecast = forecastByLocationDayParam(location, selectedDay)

	displayKeys.map((key) => (
		<Keys key={`key-${key}`}>
			<AppText>{key}</AppText>
		</Keys>
	))

	const displayForecasts = forecast.map(([param, estimate], topIndex) => (
		<AirDataRow key={topIndex} {...{ param, estimate }} />
	))

	return (
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
