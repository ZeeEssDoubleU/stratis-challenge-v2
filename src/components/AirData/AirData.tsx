import { Layout } from "@ui-kitten/components"
import { isEmpty } from "lodash"
import React, { useState } from "react"
import { View } from "react-native"
import styled from "styled-components"
import { AppText } from "../AppText"
import { AirDataCard_I } from "./AirDataCard"

// ************
// component
// ************

export function AirData({ current, forecast }: AirDataCard_I) {
	const [selected, setSelected] = useState(current?.dominentpol || null)

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
			return (
				<Row key={`row-${topIndex}`} level="3">
					<Params key={`param-${topIndex}`} level="3">
						<AppText category="s1">{param}</AppText>
					</Params>
					{Object.entries(estimate)
						.filter(([key]) => key !== "day")
						.sort((a, b) => a[0] - b[0])
						.map(([key, value]) => {
							return (
								<Wrapper key={key}>
									<Values key={value} level="3">
										<AppText>{value}</AppText>
									</Values>
								</Wrapper>
							)
						})}
				</Row>
			)
		})

	return (
		<Container>
			<Thing>{displayKeys}</Thing>
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
const Row = styled(Layout)`
	flex: 1;
	flex-direction: row;
	margin: 4px;
	padding: 0 4px;
`
const Wrapper = styled(View)`
	flex: 1;
`
const Box = styled(Layout)`
	height: 40px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex: 1;
`
const Params = styled(Layout)`
	align-items: flex-start;
	justify-content: center;
	flex: 1;
`
const Keys = styled(Box)`
	flex: 1;
`
const Values = styled(Box)``
const Thing = styled(View)`
	flex: 1;
	flex-direction: row;
`
