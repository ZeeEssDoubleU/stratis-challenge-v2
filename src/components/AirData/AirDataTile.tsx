import React, { ReactElement } from 'react';
import { Animated, ViewProps } from 'react-native';
import styled from 'styled-components/native';

import { RenderProp } from '@ui-kitten/components/devsupport';

import { AirDataStateCurrent_I } from '../../redux/slices';
import { showCondition } from '../../utils';
import { Tile } from '../Tile';

// ************
// types
// ************

export interface AirDataTile_I {
	airData: AirDataStateCurrent_I
	header?: RenderProp<ViewProps>
	children?: ReactElement | ReactElement[]
	footer?: RenderProp<ViewProps>
}

// ************
// component
// ************

export function AirDataTile({ airData, ...props }: AirDataTile_I) {
	const { color: ratingColor } = showCondition(airData.aqi)

	return (
		<Animated.View>
			<Container
				onPress={() => expandDown()}
				{...{ ratingColor, ...props }}
			/>
		</Animated.View>
	)
}

// ************
// styles
// ************

const Container = styled(Tile)<{ ratingColor?: string; expand: boolean }>`
	border-top-color: ${({ ratingColor }) =>
		ratingColor ? ratingColor : "transparent"};
	border-top-width: 6px;
`
