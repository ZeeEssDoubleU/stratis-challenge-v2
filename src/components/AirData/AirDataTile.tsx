import React, { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import Animated, {
    runOnJS, useAnimatedStyle, useSharedValue, withSpring
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import {
    AirDataStateCurrent_I
} from '../../redux/airDataSlice/reduxAirDataSlice';
import { AirDataTileContents } from './AirDataTileContents';

// ************
// types
// ************

export interface AirDataTile_I {
	airData: AirDataStateCurrent_I
}

// ************
// component
// ************

export function AirDataTile({ airData }: AirDataTile_I) {
	const window = useWindowDimensions()
	const [isExpanded, setExpanded] = useState(false)

	/**
	 * animation blocks
	 */
	// ! anim values
	// mulltipliers
	const minHeight = Math.max(window.height * 0.2, 170)
	const minWidth = Math.max(window.width * 0.4, 150)
	const maxHeight = Math.max(window.height * 0.8, 600)
	const maxWidth = Math.min(window.width * 0.55, 230)

	// props
	const springProps = {
		damping: 20,
		stiffness: 200,
	}

	// animation
	const width = useSharedValue(minWidth)
	const height = useSharedValue(minHeight)
	const animatedStyles = useAnimatedStyle(() => {
		return {
			width: width.value,
			height: height.value,
		}
	})

	// ! this does not play nicely with RN support tools and debuggers.  Unfotunately figured this out late :/
	return (
		<Container
			onStartShouldSetResponderCapture={(e) => true}
			onPress={() => {
				width.value = withSpring(
					!isExpanded ? maxWidth : minWidth,
					springProps,
					(finished) => {
						if (finished && !isExpanded) {
							runOnJS(setExpanded)(true)
						} else if (finished && isExpanded) {
							runOnJS(setExpanded)(false)
						}
					},
				)
				height.value = withSpring(
					!isExpanded ? maxHeight : minHeight,
					springProps,
					(finished) => {
						if (finished && !isExpanded) {
							runOnJS(setExpanded)(true)
						} else if (finished && isExpanded) {
							runOnJS(setExpanded)(false)
						}
					},
				)
			}}
		>
			<Animation style={animatedStyles}>
				<AirDataTileContents {...{ airData }} />
			</Animation>
		</Container>
	)
}

// ************
// styles
// ************

export const Animation = styled(Animated.View)``

const Container = styled(Pressable)`
	/* position: absolute; */
	z-index: 10;
	/* flex: 1; */
	align-items: center;
	justify-content: center;
	/* height: 100%; */
	width: 100%;
	/* background: lightslategray; */
	/* overflow: hidden; */
`
