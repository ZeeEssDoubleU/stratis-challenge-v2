import { Provider_I } from 'globalTypes';
import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { reduxAirDataSlice, reduxLocationSlice } from './slices';

// ************
// store
// ************

export const store = configureStore({
	reducer: {
		location: reduxLocationSlice.reducer,
		airData: reduxAirDataSlice.reducer,
	},
})

// ************
// provider
// ************

export function ReduxProvider({ children }: Provider_I) {
	return <Provider store={store}>{children}</Provider>
}
