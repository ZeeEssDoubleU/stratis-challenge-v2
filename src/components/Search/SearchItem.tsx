import React from 'react';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/core';
import { ListItem } from '@ui-kitten/components';

import { airDataSlice, useAirDataSelectors } from '../../redux/airDataSlice';
import { useReduxDispatch } from '../../redux/store';
import { titleCase } from '../../utils/formatText';

// ************
// component
// ************

export const SearchItem = ({ location }: { location: string }) => {
	const navigation = useNavigation()
	const dispatch = useReduxDispatch()
	const { setSelectedLocation } = airDataSlice.actions
	const { stationByLocation, aqiByLocation } = useAirDataSelectors()
	const station = stationByLocation(location)

	return (
		<StyledListItem
			title={titleCase(location)}
			description={titleCase(station.full)}
			onPress={() => {
				dispatch(setSelectedLocation(location))
				navigation.goBack()
			}}
		/>
	)
}

// ************
// styles
// ************

export const StyledListItem = styled(ListItem)`
	text-transform: capitalize;
`
