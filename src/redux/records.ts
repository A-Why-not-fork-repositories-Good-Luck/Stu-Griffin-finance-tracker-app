import { recordStore } from '../model/record';
import { createSlice } from '@reduxjs/toolkit';

export const recordsSlice = createSlice({
	name: 'records',
	initialState: recordStore,
	reducers: {
		addRecord: (state, action) => {
			return [...state, action.payload];
		},
	},
});

export default recordsSlice.reducer;
export const { addRecord } = recordsSlice.actions;