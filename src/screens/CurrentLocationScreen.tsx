import React, { useEffect } from "react"
import styled from "styled-components/native"
// import components
import { View } from "react-native"
import { Layout } from "@ui-kitten/components"
import { AirDataCard, AirDataHero, Loading } from "@components"
// import hooks / redux / types
import { useLocation } from "../hooks"
import { fetchAQI } from "../utils"
import { useAirDataSlice } from "../redux"
import { ScrollView } from "react-native-gesture-handler"

// ************
// screen
// ************

export default function CurrentLocationScreen() {
	const { location } = useLocation()
	const { setData, current, forecast } = useAirDataSlice()

	// get AQI data
	useEffect(() => {
		if (location) {
			const data = await fetchAQI(location)
			setData(data)
		}
	}, [location])

	// show spinner if data still loading
	if (!current || !forecast) return <Loading />

	return (
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
	)
}

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
