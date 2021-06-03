import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { AirDataCurrent, AirDataForecast } from '../components/AirData';
import { Loading } from '../components/Loading';
import { TopNavWrapper } from '../components/Nav';
import { useCachedResources } from '../hooks/useCachedResources';
import { OpenModal } from '../navigation/actions/NavActions';
import { useLocationSelectors } from '../redux/locationSlice';

// ************
// screen
// ************

export function CurrentLocationScreen() {
	const { coordinates } = useLocationSelectors()
	const { isAppReady } = useCachedResources()

	return !isAppReady || !coordinates ? (
		<Loading />
	) : (
		<TopNavWrapper
			alignment="center"
			title="Current Location"
			subtitle={`Lat: ${coordinates.latitude}\nLong: ${coordinates.longitude}`}
			accessoryRight={() => OpenModal("Search Modal")}
		>
			{/* // TODO: look at creating an image hero showing a pic the city */}
			<ScrollView>
				<AirDataCurrent />
				<AirDataForecast />
			</ScrollView>
		</TopNavWrapper>
	)
}
