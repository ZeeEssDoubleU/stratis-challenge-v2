import React from 'react';

import { Layout } from '@ui-kitten/components';

import { AppText } from '../../components/AppText';
import { GoBack } from '../actions/NavActions';
import { TopNavWrapper } from '../components/TopNavWrapper';

// ************
// modal
// ************

export function SearchModal({ navigation }: { navigation: NavigationType }) {
	return (
		<TopNavWrapper {...{ navigation }} accessoryLeft={GoBack}>
			<Layout>
				<AppText>This is a search modal!</AppText>
			</Layout>
		</TopNavWrapper>
	)
}
