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

/**
 * awaited promise
 * ! getting 'awaited is not generic error'
 */
declare type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
