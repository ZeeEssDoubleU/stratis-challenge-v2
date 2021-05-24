import React, { ReactElement } from "react"
import { ViewProps } from "react-native"
import styled from "styled-components/native"
import { RenderProp } from "@ui-kitten/components/devsupport"
import { AirDataStateCurrent_I } from "@redux"
import { showCondition } from "@utils"
import { Tile } from "../Tile"

// ************
// types
// ************

export interface AirDataTile_I {
	aqiRating: AirDataStateCurrent_I["aqi"]
	header?: RenderProp<ViewProps>
	children?: ReactElement | ReactElement[]
	footer?: RenderProp<ViewProps>
}

// ************
// component
// ************

export function AirDataTile({ aqiRating, ...props }: AirDataTile_I) {
	const { color: ratingColor } = showCondition(aqiRating)

	return <Container {...{ ratingColor, ...props }} />
}

// ************
// styles
// ************

const Container = styled(Tile)<{ ratingColor?: string }>`
	border-top-color: ${({ ratingColor }) =>
		ratingColor ? ratingColor : "transparent"};
	border-top-width: 6px;
`
