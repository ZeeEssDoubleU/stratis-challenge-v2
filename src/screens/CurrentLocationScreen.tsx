import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import styled from "styled-components/native"
import { Layout } from "@ui-kitten/components"
import { isEmpty } from "lodash"
import { AirDataCard, AirDataHero, Loading } from "@components"
import { TopNavWrapper } from "@navigation"
import { useCachedResources, useGetLocation } from "@hooks"
import { useReduxAirDataSlice, useReduxLocationSlice } from "@redux"

// ************
// screen
// ************

export function CurrentLocationScreen({ navigation }) {
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
		>
			<Container>
				<Current>
					<AirDataHero airData={current} />
				</Current>
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
			</Container>
		</TopNavWrapper>
	)
}

// ************
// styles
// ************

const Container = styled(Layout)`
	flex: 1;
	align-items: center;
	justify-content: center;
`
const Current = styled(View)`
	flex: 1;
	width: 100%;
`
const Forecast = styled(ScrollView)`
	flex: 1;
	width: 100%;
`
