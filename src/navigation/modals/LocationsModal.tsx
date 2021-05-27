import React from 'react';

import { Layout } from '@ui-kitten/components';

import { AppText } from '../../components/AppText';
import { GoBack, OpenModal } from '../actions/NavActions';
import { TopNavWrapper } from '../components/TopNavWrapper';

// ************
// modal
// ************

export function LocationsModal({ navigation }: { navigation: NavigationType }) {
	return (
		<TopNavWrapper
			{...{ navigation }}
			accessoryLeft={GoBack}
			accessoryRight={() => OpenModal("Search Modal")}
		>
			<Layout>
				<AppText>This is the locations modal!</AppText>
			</Layout>
		</TopNavWrapper>
	)
}
