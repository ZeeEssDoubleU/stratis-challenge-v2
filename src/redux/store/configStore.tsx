import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { Provider_I } from '../../@types/global';
import { airDataSlice } from '../airDataSlice/airDataSlice';
import {
    airDataSlice as airDataSlice_fix
} from '../airDataSlice_fix/airDataSlice';
import { locationSlice } from '../locationSlice/locationSlice';
import { reactotron } from '../middleware/ReactotronConfig';

// ************
// store
// ************

export const store = configureStore({
	reducer: {
		location: locationSlice.reducer,
		airData: airDataSlice.reducer,
		// TODO: remove and replace airData when fixed
		airData_fix: airDataSlice_fix.reducer,
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
