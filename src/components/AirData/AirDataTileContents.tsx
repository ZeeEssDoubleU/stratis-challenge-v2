import React from 'react';
import { View } from 'react-native';
import reactotron from 'reactotron-react-native';
import styled from 'styled-components/native';

import { useAirDataSelectors_fix } from '../../redux/airDataSlice_fix';
import { showCondition } from '../../utils';
import { AppText } from '../AppText';
import { Header } from '../Header';
import { Tile } from '../Tile/Tile';
import { AirDataTileRow } from './AirDataTileRow';

// ************
// component
// ************

export function AirDataTileContents({ location }: { location: string }) {
	const { aqiByLocation } = useAirDataSelectors_fix()

	const aqiData = aqiByLocation(location)

	const { color: ratingColor } = showCondition(aqiData.aqi)

	const alternateReadings =
		aqiData &&
		Object.entries(aqiData.iaqi).map(([param, value]) => {
			return <AirDataTileRow key={param} {...{ param, value }} />
		})

	return aqiData ? (
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
			{...{ ratingColor }}
		>
			<AppText align="center" category="h1">
				{aqiData?.aqi}
			</AppText>
			<AppText align="center" category="p2">
				{aqiData?.dominentpol}
			</AppText>
			<CollapsibleView>{alternateReadings}</CollapsibleView>
		</Container>
	) : null
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
