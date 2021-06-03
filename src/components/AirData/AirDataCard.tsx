import { capitalize } from 'lodash';
import React from 'react';

import { useAirDataSelectors_fix } from '../../redux/airDataSlice_fix';
import { getFormattedDate, RelativeDay } from '../../utils';
import { AppCard } from '../AppCard';
import { AppText } from '../AppText';
import { Header } from '../Header';
import { AirData } from './AirData';

// ************
// component
// ************

export function AirDataCard({
	location,
	selectedDay,
}: {
	location: string
	selectedDay: RelativeDay
}) {
	const { forecastByLocationDay } = useAirDataSelectors_fix()
	const forecast = forecastByLocationDay(location, selectedDay)

	return (
		<AppCard
			header={(props) => (
				<Header
					title={getFormattedDate(selectedDay)}
					titleCategory="h4"
					subtitle={capitalize(selectedDay)}
					{...props}
				/>
			)}
		>
			{forecast ? (
				<AirData {...{ location, selectedDay }} />
			) : (
				<AppText>No forecast found for this date and location.</AppText>
			)}
		</AppCard>
	)
}
