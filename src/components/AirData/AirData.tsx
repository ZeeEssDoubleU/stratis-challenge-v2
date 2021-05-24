import React, { useState } from "react"
import styled from "styled-components"
import { View } from "react-native"
import { AirDataCard_I, Header, AppText, Tile } from "@components"

// ************
// component
// ************

export function AirData({ current, forecast }: AirDataCard_I) {
	const [selected, setSelected] = useState(current?.dominentpol || null)

	if (!forecast) return null

	const targetDayForecastByParam = Object.entries(forecast["forecast"])

	const displayData = targetDayForecastByParam
		.filter(([param]) => param === selected)
		.map(([param, paramForecast]) => {
			const measurements = Object.entries(paramForecast)

			return (
				<Tile
					key={param}
					// TODO: show correct status here
					// status="success"
					header={(props) => (
						<Header
							align="center"
							title={param} // ie pm25
							titleCategory="s1"
							{...props}
						/>
					)}
				>
					{measurements
						.filter(([measurement]) => measurement !== "day")
						.map(([measurement, value]) => {
							return (
								<Row key={measurement}>
									<AppText>{`${measurement}:`}</AppText>
									<AppText align="right">{value}</AppText>
								</Row>
							)
						})}
				</Tile>
			)
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
