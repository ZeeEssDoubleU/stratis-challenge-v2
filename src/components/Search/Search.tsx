import React, { useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import styled from 'styled-components';

import { Button, Input } from '@ui-kitten/components';

import { fetchAQIByCity } from '../../redux/airDataSlice';
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
						dispatch(fetchAQIByCity({ search: text }))
						setText("")
					}}
					returnKeyType="search"
					textContentType="addressCity"
					accessoryRight={(props) => (
						<StyledButton
							accessoryLeft={SearchIcon}
							appearance="ghost"
							onPress={() => {
								dispatch(fetchAQIByCity({ search: text }))
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
