import React, { useState } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import Animated, {
    runOnJS, useAnimatedStyle, useSharedValue, withSpring
} from 'react-native-reanimated';

import { AirDataTileContents } from './AirDataTileContents';

// ************
// component
// ************

export function AirDataTile({ location }: { location: string }) {
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
		<Pressable
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
			<Animated.View style={animatedStyles}>
				<AirDataTileContents {...{ location }} />
			</Animated.View>
		</Pressable>
	)
}
