import React from 'react';
import { ViewProps } from 'react-native';

import { RenderProp } from '@ui-kitten/components/devsupport';

import {
    AirDataStateCurrent_I
} from '../../redux/airDataSlice/reduxAirDataSlice';
import { FilteredForecast } from '../../redux/helpers';
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
