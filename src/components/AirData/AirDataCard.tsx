import React from 'react';
import { ViewProps } from 'react-native';

import { AirDataStateCurrent_I, FilteredForecast } from '@redux';
import { RenderProp } from '@ui-kitten/components/devsupport';

import { AppCard } from '../AppCard';
import { Header } from '../Header';
import { AirData } from './AirData';

// ************
// types
// ************

export interface AirDataCard_I {
	current?: AirDataStateCurrent_I
	forecast: FilteredForecast
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
