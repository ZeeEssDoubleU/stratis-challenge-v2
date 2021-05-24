import React from "react"
import { ThemeProvider } from "styled-components/native"
import { theme } from "./theme"
// import types
import { Provider_I } from "globalTypes"

// ************
// module declaration
// ************

// merge theme (below) to DefaultTheme
declare module "styled-components" {
	type ThemeType = typeof theme
	export interface DefaultTheme extends ThemeType {}
}

// ************
// provider
// ************

export function SCProvider({ children }: Provider_I) {
	return <ThemeProvider {...{ theme }}>{children}</ThemeProvider>
}
