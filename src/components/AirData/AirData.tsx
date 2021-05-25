import React, { useState } from "react"
import { View } from "react-native"
import styled from "styled-components"

import { AppText } from "../AppText"
import { Header } from "../Header"
import { AirDataCard_I } from "./AirDataCard"
import { AirDataTile } from "./AirDataTile"
import { isEmpty } from "lodash"
import { FilteredForecast } from "@redux"

// ************
// component
// ************

export function AirData({ current, forecast }: AirDataCard_I) {
	const [selected, setSelected] = useState(current?.dominentpol || null)

	if (!forecast && isEmpty(forecast)) return null

	const targetDayForecastByParam = Object.entries(forecast)

	const displayData = targetDayForecastByParam
		.filter(([param]) => param === selected)
		.map(([param, paramForecast]) => {
			const measurements = Object.entries(
				paramForecast as string | { string: string | number },
			)
			// max used below to display aqi color
			const max = measurements.filter(([key]) => key === "max" && key)
			const maxRating = max[0][1] as number

			const displayMeasurements = measurements
				.filter(([measurement]) => measurement !== "day")
				.map(([measurement, value]) => {
					return (
						<Row key={measurement}>
							<AppText>{`${measurement}:`}</AppText>
							<AppText align="right">{value}</AppText>
						</Row>
					)
				})

			const displayTile = (
				<AirDataTile
					key={param}
					aqiRating={maxRating}
					header={(props) => (
						<Header
							align="center"
							title={param} // ie pm25
							titleCategory="s1"
							{...props}
						/>
					)}
				>
					{/* // ! called above in displayData map */}
					{displayMeasurements}
				</AirDataTile>
			)

			return displayTile
		})

	return <>{displayData}</>
}

// ************
// styles
// ************

const Row = styled(View)`
	flex-direction: row;
	justify-content: space-between;
`
