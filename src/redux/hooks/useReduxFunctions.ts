import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { store } from "../configStore"

// ************
// types
// ************

export type Dispatch_Type = typeof store.dispatch
export type RootState_Type = ReturnType<typeof store.getState>

// ************
// hook
// ************

// use these instead of default useDispatch and useSelector
// adds on declared types
export const useReduxDispatch = () => useDispatch<Dispatch_Type>()
export const useReduxSelector: TypedUseSelectorHook<RootState_Type> =
	useSelector
