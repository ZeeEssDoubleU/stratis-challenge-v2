import React from 'react';

import { TopNavWrapper } from '../../components/Nav';
import { Search } from '../../components/Search';
import { GoBack } from '../actions/NavActions';

// ************
// modal
// ************

export function SearchModal() {
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
