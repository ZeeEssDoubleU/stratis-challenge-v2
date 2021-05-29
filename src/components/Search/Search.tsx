import React, { useState } from 'react';
import {
    Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text,
    TextInput, TouchableWithoutFeedback, View
} from 'react-native';
import reactotron from 'reactotron-react-native';

import { fetchAQIByCity } from '../../redux/airDataSlice/reduxAirDataSlice';
import { useReduxDispatch } from '../../redux/store';

// ************
// component
// ************

export function Search() {
	const [text, setText] = useState("")
	const dispatch = useReduxDispatch()

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.inner}>
					<Text style={styles.header}>Search by city</Text>
					<TextInput
						placeholder="Search by city name (ie Dallas)"
						onChangeText={(text) => setText(text)}
						style={styles.textInput}
					/>
					<View style={styles.btnContainer}>
						<Button
							title="Submit"
							onPress={() => {
								reactotron.log("text:", text) // ? debug
								dispatch(fetchAQIByCity(text))
							}}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

// TODO: pulled straight from RN.  Need to redo
// ************
// styles
// ************

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inner: {
		padding: 24,
		flex: 1,
		justifyContent: "space-around",
	},
	header: {
		fontSize: 36,
		marginBottom: 48,
	},
	textInput: {
		height: 40,
		borderColor: "#000000",
		borderBottomWidth: 1,
		marginBottom: 36,
	},
	btnContainer: {
		backgroundColor: "white",
		marginTop: 12,
	},
})
