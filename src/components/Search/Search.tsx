import React, { useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import styled from 'styled-components';

import { Button, Input } from '@ui-kitten/components';

import { fetchAQIByCity_fix } from '../../redux/airDataSlice_fix';
import { useReduxDispatch } from '../../redux/store';
import { SearchIcon } from '../Icons';
import { SearchList } from './SearchList';

// ************
// component
// ************

export function Search() {
	const [text, setText] = useState("")
	const dispatch = useReduxDispatch()

	return (
		<Container onPress={Keyboard.dismiss}>
			<Wrapper>
				<StyledInput
					placeholder="Search by city name (ie Dallas)"
					value={text}
					onChangeText={(text) => setText(text)}
					onSubmitEditing={() => {
						dispatch(fetchAQIByCity_fix({ search: text }))
						setText("")
					}}
					accessoryRight={(props) => (
						<StyledButton
							accessoryLeft={SearchIcon}
							appearance="ghost"
							onPress={() => {
								dispatch(fetchAQIByCity_fix({ search: text }))
								setText("")
							}}
							{...props}
						/>
					)}
				/>
			</Wrapper>
			<SearchList />
		</Container>
	)
}

// TODO: pulled straight from RN.  Need to redo
// ************
// styles
// ************

const Container = styled(Pressable)`
	flex: 1;
`
const Wrapper = styled(View)`
	flex-direction: row;
	padding: 16px;
`
const StyledInput = styled(Input)`
	flex: 1;
	padding: 0;
`
const StyledButton = styled(Button)`
	margin: 0;
`
