import React from 'react';
import { View } from 'react-native';

import { TextProps } from '@ui-kitten/components';

import { AppText, TextAlign } from '../AppText';

// ************
// types
// ************

// TODO: fix align properties

export interface Header_I {
	title: string
	titleCategory?: TextProps["category"]
	subtitle?: string
	subtitlecategory?: TextProps["category"]
	align?: TextAlign
	// TODO: give this proper enum
	textTransform?: string
}

// ************
// component
// ************

export function Header({
	title,
	titleCategory = "h3",
	subtitle,
	subtitlecategory = "h6",
	align = "auto",
	textTransform = "capitalize",
	...props
}: Header_I) {
	if (!title) return null

	return (
		<View {...props}>
			<AppText {...{ align, textTransform }} category={titleCategory}>
				{title}
			</AppText>
			{subtitle && (
				<AppText {...{ align, textTransform }} category={subtitlecategory}>
					{subtitle}
				</AppText>
			)}
		</View>
	)
}
