import { upperFirst, words } from 'lodash';
import React from 'react';
import styled from 'styled-components/native';

import { ListItem } from '@ui-kitten/components';

import { useAirDataSelectors_fix } from '../../redux/airDataSlice_fix';

// ************
// component
// ************

export const SearchItem = ({ location }: { location: string }) => {
	const { stationByLocation, aqiByLocation } = useAirDataSelectors_fix()
	const station = stationByLocation(location)

	const titleCase = (string) => words(string).map(upperFirst).join(" ")

	return (
		<StyledListItem
			title={location.split(" ").map(upperFirst).join(" ")}
			description={station.full.split(" ").map(upperFirst).join(" ")}
		/>
	)
}

// ************
// styles
// ************

export const StyledListItem = styled(ListItem)`
	text-transform: capitalize;
`
