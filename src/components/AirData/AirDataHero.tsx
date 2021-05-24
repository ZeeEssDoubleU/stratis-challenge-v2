import React from "react"
import { View } from "react-native"
import styled from "styled-components/native"
import {
	AirDataStateCurrent_I,
	useReduxAirDataSlice,
	useReduxLocationSlice,
} from "../../redux"
import { AppText, Header, Tile } from "@components"

// ************
// types
// ************

export interface AirDataHero_I {
	airData: AirDataStateCurrent_I
	forecast?: boolean
}

// ************
// component
// ************

export function AirDataHero({ airData }: AirDataHero_I) {
	const { location: gpsLocation } = useReduxLocationSlice()
	const { location: stationLocation } = useReduxAirDataSlice()

	if (!stationLocation || !gpsLocation) return null

	return (
		<Container>
			<AppText>{`Latitude: ${gpsLocation.latitude}`}</AppText>
			<AppText>{`Longitude: ${gpsLocation.longitude}`}</AppText>
			<Header
				align="center"
				title={stationLocation.city}
				titleCategory="h3"
				subtitle={stationLocation.station}
			/>
			<AppText category="s1">{`${airData?.date} @ ${airData?.time}`}</AppText>
			<Tile
				// TODO: show correct status here
				// status="danger"
				header={(props) => (
					<Header
						align="center"
						title={"AQI"}
						titleCategory="s1"
						{...props}
					/>
				)}
			>
				<AppText align="center" category="h1">
					{airData?.aqi}
				</AppText>
				<AppText align="center" category="p2">
					{airData?.dominentpol}
				</AppText>
			</Tile>
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
	border: none
	margin: 0;
`
