import React, { ReactElement, useState } from "react"
import { ViewProps } from "react-native"
import styled from "styled-components/native"

import { AirDataStateCurrent_I } from "@redux"
import { RenderProp } from "@ui-kitten/components/devsupport"
import { showCondition } from "@utils"

import { Tile } from "../Tile"

// ************
// types
// ************

export interface AirDataTile_I {
	airData: AirDataStateCurrent_I
	header?: RenderProp<ViewProps>
	children?: ReactElement | ReactElement[]
	footer?: RenderProp<ViewProps>
}

// ************
// component
// ************

export function AirDataTile({ airData, ...props }: AirDataTile_I) {
	const [expand, setExpanded] = useState(false)
	const { color: ratingColor } = showCondition(airData.aqi)

	return (
		<Container
			onPress={() => {
				setExpanded(expand)
			}}
			{...{ ratingColor, ...props }}
		/>
	)
}

// ************
// styles
// ************

const Container = styled(Tile)<{ ratingColor?: string; expand: boolean }>`
	border-top-color: ${({ ratingColor }) =>
		ratingColor ? ratingColor : "transparent"};
	border-top-width: 6px;
`
