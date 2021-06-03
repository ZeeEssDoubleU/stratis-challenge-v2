import React from 'react';
import styled from 'styled-components/native';

import { TopNavWrapper } from '../../components/Nav';
import { Search } from '../../components/Search';
import { GoBack } from '../actions/NavActions';

// ************
// modal
// ************

export function SearchModal({ navigation }: { navigation: NavigationType }) {
	return (
		<TopNavWrapper
			alignment="center"
			title="Search Locations"
			accessoryLeft={GoBack}
		>
			<Search />
		</TopNavWrapper>
	)
}
