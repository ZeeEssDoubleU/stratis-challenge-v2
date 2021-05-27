import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { Provider_I } from '../@types/global';
import { reactotron } from './middleware/ReactotronConfig';
import { reduxAirDataSlice, reduxLocationSlice } from './slices';

// ************
// store
// ************

export const store = configureStore({
	reducer: {
		location: reduxLocationSlice.reducer,
		airData: reduxAirDataSlice.reducer,
	},
	// https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux.md
	enhancers: [reactotron.createEnhancer()],
})

// ************
// provider
// ************

export function ReduxProvider({ children }: Provider_I) {
	return <Provider store={store}>{children}</Provider>
}
