import React from 'react';
import styled from 'styled-components/native';

import { Divider, Layout, List } from '@ui-kitten/components';

import { useAirDataSelectors_fix } from '../../redux/airDataSlice_fix';
import { useReduxDispatch } from '../../redux/store';
import { Header } from '../Header';
import { SearchItem } from './SearchItem';

// ************
// component
// ************

export const SearchList = () => {
	const dispatch = useReduxDispatch()
	const { successfulSearches } = useAirDataSelectors_fix()

	return (
		<Container>
			<StyledHeader titleCategory="s1" title={`Successful Searches`} />
			<List
				data={successfulSearches}
				ItemSeparatorComponent={Divider}
				renderItem={({ item: location, index }) => (
					<SearchItem {...{ location }} />
				)}
			/>
		</Container>
	)
}

// ************
// styles
// ************

export const Container = styled(Layout)`
	flex: 1;
`
export const StyledHeader = styled(Header)`
	padding: 16px;
`
