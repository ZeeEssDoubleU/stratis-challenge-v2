import React from "react"
import { ViewProps } from "react-native"
import { RenderProp } from "@ui-kitten/components/devsupport"
import { AppCard } from "../AppCard"
import { AirData } from "./AirData"
import { Header } from "../Header"
import { AirDataStateCurrent_I, DailyMeasurementsWithDate_I } from "@redux"

// ************
// types
// ************

export interface AirDataCard_I {
	current?: AirDataStateCurrent_I
	forecast: DailyMeasurementsWithDate_I
}

// ************
// component
// ************

export function AirDataCard({ current, forecast }: AirDataCard_I) {
	if (!forecast) return null

	const DisplayHeader: RenderProp<ViewProps> = (props) => (
		<Header
			title={forecast.relativeDay}
			titleCategory="h4"
			subtitle={forecast.date}
			{...props}
		/>
	)

	return (
		<AppCard header={DisplayHeader}>
			<AirData {...{ current, forecast }} />
		</AppCard>
	)
}
