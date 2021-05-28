import { useState } from 'react';

// ************
// types
// ************

export type GetInitLayout_I = {
	x: number
	y: number
	height: number
	width: number
}

// ************
// hook
// ************

export function useGetInitLayout() {
	const [initLayout, setInitLayout] = <GetInitLayout_I>(
		useState({ x: 0, y: 0, height: 0, width: 0 })
	)
	const [isInitSet, setInit] = <boolean>useState(false)

	return {
		initLayout,
		isInitSet,
		setInitLayout,
		setInit,
	}
}
