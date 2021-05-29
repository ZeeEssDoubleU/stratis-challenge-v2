import React from 'react';

import { Layout } from '@ui-kitten/components';

import { TopNavWrapper } from '../../components/Nav';
import { Search } from '../../components/Search';
import { GoBack } from '../actions/NavActions';

// ************
// modal
// ************

export function SearchModal({ navigation }: { navigation: NavigationType }) {
	return (
		<TopNavWrapper {...{ navigation }} accessoryLeft={GoBack}>
			<Layout>
				<Search />
			</Layout>
		</TopNavWrapper>
	)
}
