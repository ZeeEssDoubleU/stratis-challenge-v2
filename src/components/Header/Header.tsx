import React from 'react';
import { View } from 'react-native';

import { TextProps } from '@ui-kitten/components';

import { AppText, TextAlign } from '../AppText';

// ************
// types
// ************

export interface Header_I {
	title: string
	titleCategory?: TextProps["category"]
	subtitle?: string
	subtitlecategory?: TextProps["category"]
	align?: TextAlign
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
	...props
}: Header_I) {
	if (!title) return null

	return (
		<View {...props}>
			<AppText {...{ align }} category={titleCategory}>
				{title}
			</AppText>
			{subtitle && (
				<AppText {...{ align }} category={subtitlecategory}>
					{subtitle}
				</AppText>
			)}
		</View>
	)
}
