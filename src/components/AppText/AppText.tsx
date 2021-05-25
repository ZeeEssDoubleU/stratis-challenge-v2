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

export const AppText = styled(Text)<{ align?: TextAlign }>`
	text-align: ${({ align }) => align || "auto"};
	margin: 2px;
`
