import { isEmpty } from "lodash"
import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import styled from "styled-components/native"
import { AirDataCard, AirDataHero, Loading } from "@components"
import { useCachedResources } from "@hooks"
import { OpenModal, TopNavWrapper } from "@navigation"
import { useReduxAirDataSlice, useReduxLocationSlice } from "@redux"
import { NavigationProp } from "@react-navigation/core"

// ************
// screen
// ************

export function CurrentLocationScreen({
	navigation,
}: {
	navigation: NavigationType
}) {
	const { isAppReady } = useCachedResources()

	const {
		location: { latitude, longitude },
	} = useReduxLocationSlice()
	const { current, forecast } = useReduxAirDataSlice()

	// show spinner if data still loading
	if (isEmpty(current) || isEmpty(forecast) || !isAppReady) return <Loading />

	return (
		<TopNavWrapper
			{...{ navigation }}
			alignment="center"
			title="Current Location"
			subtitle={`Lat: ${latitude}\nLong: ${longitude}`}
			accessoryRight={() => OpenModal("Locations Modal")}
		>
			{/* // TODO: look at creating an image hero showing a pic the city */}
			<Current>
				<AirDataHero airData={current} />
			</Current>
			{/* // TODO: look into changing card layout */}
			<Forecast
				horizontal
				contentOffset={{ x: 200 - 20 - 20, y: 0 }}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<AirDataCard {...{ current, forecast: forecast.yesterday }} />
				<AirDataCard {...{ current, forecast: forecast.today }} />
				<AirDataCard {...{ current, forecast: forecast.tomorrow }} />
			</Forecast>
		</TopNavWrapper>
	)
}

// ************
// styles
// ************

const Current = styled(View)`
	flex: 1;
	width: 100%;
`
const Forecast = styled(ScrollView)`
	flex: 1;
	width: 100%;
`
