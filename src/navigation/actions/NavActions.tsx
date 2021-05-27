import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { TopNavigationAction } from '@ui-kitten/components';

import { BackArrow, PlusOutline } from '../../components/Icons';

// ************
// actions
// ************

export const OpenModal = (targetModal: string) => {
	const navigation = useNavigation()

	return (
		<TopNavigationAction
			icon={PlusOutline}
			onPress={() => navigation.navigate(targetModal)}
		/>
	)
}

export const GoBack = () => {
	const navigation = useNavigation()

	return (
		<TopNavigationAction
			icon={BackArrow}
			onPress={() => navigation.goBack()}
		/>
	)
}
