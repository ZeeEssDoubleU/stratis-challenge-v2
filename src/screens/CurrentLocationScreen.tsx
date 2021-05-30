import { isEmpty } from 'lodash';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import { Layout } from '@ui-kitten/components';

import { AirDataCurrent } from '../components/AirData';
import { AirDataForecast } from '../components/AirData/AirDataForecast';
import { Loading } from '../components/Loading';
import { TopNavWrapper } from '../components/Nav/TopNavWrapper';
import { useCachedResources } from '../hooks/useCachedResources';
import { OpenModal } from '../navigation/actions/NavActions';
import { useAirDataSelectors } from '../redux/airDataSlice';
import { useLocationSelectors } from '../redux/locationSlice';

// ************
// screen
// ************

export function CurrentLocationScreen({
	navigation,
}: {
	navigation: NavigationType
}) {
	const window = useWindowDimensions()
	const { isAppReady } = useCachedResources()

	const {
		location: { latitude, longitude },
	} = useLocationSelectors()
	const { current, forecast } = useAirDataSelectors()

	// show spinner if data still loading
	if (isEmpty(current) || isEmpty(forecast) || !isAppReady) return <Loading />

	return (
		<Container>
			<TopNavWrapper
				{...{ navigation }}
				alignment="center"
				title="Current Location"
				subtitle={`Lat: ${latitude}\nLong: ${longitude}`}
				accessoryRight={() => OpenModal("Search Modal")}
			>
				{/* // TODO: look at creating an image hero showing a pic the city */}
				<AirDataCurrent airData={current} />
				<AirDataForecast {...{ window }} airData={{ current, forecast }} />
			</TopNavWrapper>
		</Container>
	)
}

// ************
// styles
// ************

export const Container = styled(Layout)`
	flex: 1;
`
