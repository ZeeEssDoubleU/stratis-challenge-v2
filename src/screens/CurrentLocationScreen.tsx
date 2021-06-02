import React from 'react';
import styled from 'styled-components/native';

import { Layout } from '@ui-kitten/components';

import { AirDataCurrent } from '../components/AirData';
import { Loading } from '../components/Loading';
import { TopNavWrapper } from '../components/Nav/TopNavWrapper';
import { useCachedResources } from '../hooks/useCachedResources';
import { OpenModal } from '../navigation/actions/NavActions';
import { useLocationSelectors } from '../redux/locationSlice';

// ************
// screen
// ************

export function CurrentLocationScreen({
	navigation,
}: {
	navigation: NavigationType
}) {
	const { isAppReady } = useCachedResources()

	const { coordinates } = useLocationSelectors()

	// show spinner if data still loading
	if (!isAppReady) return <Loading />

	return (
		<Container>
			<TopNavWrapper
				{...{ navigation }}
				alignment="center"
				title="Current Location"
				subtitle={`Lat: ${coordinates.latitude}\nLong: ${coordinates.longitude}`}
				accessoryRight={() => OpenModal("Search Modal")}
			>
				{/* // TODO: look at creating an image hero showing a pic the city */}
				<AirDataCurrent />
				{/* <AirDataForecast /> */}
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
