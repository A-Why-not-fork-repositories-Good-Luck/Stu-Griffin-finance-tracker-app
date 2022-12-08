import { RecordI } from '../types/record';
import { recordStore } from '../model/record';
import { createSlice } from '@reduxjs/toolkit';

export const recordsSlice = createSlice({
	name: 'records',
	initialState: recordStore,
	reducers: {
		addRecord: (state: Array<RecordI>, action): Array<RecordI> => {
			return [...state, action.payload];
		},
		setRecords: (state: Array<RecordI>, action): Array<RecordI> => {
			return [...state, ...action.payload];
		},
	},
});

export default recordsSlice.reducer;
export const { addRecord, setRecords } = recordsSlice.actions;