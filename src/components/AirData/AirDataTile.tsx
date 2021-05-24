import React, { ReactElement } from "react"
import { ViewProps } from "react-native"
import styled from "styled-components/native"
import { Card } from "@ui-kitten/components"
import { RenderProp } from "@ui-kitten/components/devsupport"

// ************
// types
// ************

export interface AirDataTile_I {
	header?: RenderProp<ViewProps>
	children?: ReactElement | ReactElement[]
	footer?: RenderProp<ViewProps>
}

// ************
// component
// ************

export function AirDataTile(props: AirDataTile_I) {
	return <Container {...props} />
}

// ************
// styles
// ************

const Container = styled(Card)`
	margin: 12px;
	align-items: center;
	justify-content: center;
`
