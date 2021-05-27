import { isEmpty } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Layout } from '@ui-kitten/components';

import { AppText } from '../AppText';
import { AirDataCard_I } from './AirDataCard';
import { AirDataRow } from './AirDataRow';

// ************
// component
// ************

export function AirData({ forecast }: AirDataCard_I) {
	if (!forecast && isEmpty(forecast)) return null

	const displayKeys = ["", "avg", "max", "min"]
		.sort((a, b) => a[0] - b[0])
		.map((key) => (
			<Keys key={`key-${key}`}>
				<AppText>{key}</AppText>
			</Keys>
		))

	const targetDayForecastByParam = Object.entries(forecast)
	// [o3, pm10, pm25, uvi]
	const displayForecasts = targetDayForecastByParam
		.filter(([key]) => key !== "date" && key !== "relativeDay")
		.map(([param, estimate], topIndex) => {
			return estimate === undefined ? null : (
				<AirDataRow key={topIndex} {...{ param, estimate }} />
			)
		})

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
