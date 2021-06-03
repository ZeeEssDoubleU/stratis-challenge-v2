import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { TopNavigationAction } from '@ui-kitten/components';

import { BackIcon, PlusIcon } from '../../components/Icons';

// ************
// actions
// ************

export const OpenModal = (targetModal: string) => {
	const navigation = useNavigation()

	return (
		<TopNavigationAction
			icon={PlusIcon}
			onPress={() => navigation.navigate(targetModal)}
		/>
	)
}

export const GoBack = () => {
	const navigation = useNavigation()

	return (
		<TopNavigationAction
			icon={BackIcon}
			onPress={() => navigation.goBack()}
		/>
	)
}
