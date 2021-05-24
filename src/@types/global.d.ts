import { ReactElement } from "react"

// ************
// types
// ************

/**
 * context provider
 */
declare interface Provider_I {
	children: ReactElement | ReactElement[]
}

/**
 * empty object
 */
declare type EmptyObj = Record<string, never>
