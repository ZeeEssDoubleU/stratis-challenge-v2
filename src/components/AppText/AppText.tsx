// import React, { ReactText } from "react"
import styled from 'styled-components/native';

import { Text } from '@ui-kitten/components';

// ************
// types
// ************

export type TextAlign = "left" | "center" | "right" | "justify" | "auto"

// ************
// styles
// ************

export const AppText = styled(Text)<{
	align?: TextAlign
	textTransform?: string
}>`
	text-align: ${({ align }) => align || "auto"};
	text-transform: ${({ textTransform }) => textTransform || "none"};
	margin: 2px;
`
