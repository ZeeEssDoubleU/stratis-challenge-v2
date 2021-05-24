import React, { useState } from "react"
import styled from "styled-components"
import { View } from "react-native"
import { AirDataCard_I, Header, AppText, Tile } from "@components"
import { AirDataDailyForecasts_I } from "@utils"

// ************
// component
// ************

export function AirData({ current, forecast }: AirDataCard_I) {
	const [selected, setSelected] = useState(current?.dominentpol || null)

	if (!forecast) return null

	const displayData = Object.entries(forecast)
		.filter(([key]) => key === selected)
		.map(([key, object]: [string, AirDataDailyForecasts_I]) => {
			return (
				<Tile
					key={key}
					// TODO: show correct status here
					// status="success"
					header={(props) => (
						<Header
							align="center"
							title={key}
							titleCategory="s1"
							{...props}
						/>
					)}
				>
					{/* loop through selected forecast entries and display in tile */}
					{Object.entries(object)
						.filter(([key]) => key !== "day")
						// TODO: will follow these types, unsure how to assert
						.map(([key, value]: [string, number]) => {
							return (
								<Row key={key}>
									<AppText>{`${key}:`}</AppText>
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
