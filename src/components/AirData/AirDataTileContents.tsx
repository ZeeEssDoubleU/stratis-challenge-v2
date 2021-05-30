import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { AirDataStateCurrent_I } from '../../redux/airDataSlice/airDataSlice';
import { showCondition } from '../../utils';
import { AppText } from '../AppText';
import { Header } from '../Header';
import { Tile } from '../Tile/Tile';
import { AirDataTileRow } from './AirDataTileRow';

// ************
// component
// ************

export function AirDataTileContents({
	airData,
}: {
	airData: AirDataStateCurrent_I
}) {
	const { color: ratingColor } = showCondition(airData?.aqi)

	const iaqiMap = []
	for (const prop in airData.iaqi) {
		iaqiMap.push([prop, airData.iaqi[prop].v])
	}

	const alternateReadings = iaqiMap.map(([param, value]) => {
		return <AirDataTileRow key={param} {...{ param, value }} />
	})

	return (
		<Container
			header={(props) => (
				<Header
					align="center"
					textTransform="uppercase"
					title={"AQI"}
					titleCategory="s1"
					{...props}
				/>
			)}
			{...{ airData, ratingColor }}
		>
			<AppText align="center" category="h1">
				{airData?.aqi}
			</AppText>
			<AppText align="center" category="p2">
				{airData?.dominentpol}
			</AppText>
			<CollapsibleView>{alternateReadings}</CollapsibleView>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(Tile)<{ ratingColor?: string; expand: boolean }>`
	border-top-color: ${({ ratingColor }) =>
		ratingColor ? ratingColor : "transparent"};
	border-top-width: 6px;
	height: 100%;
	z-index: 10;
`
export const CollapsibleView = styled(View)`
	margin-top: 30px;
	height: 100%;
	width: 100%;
`
