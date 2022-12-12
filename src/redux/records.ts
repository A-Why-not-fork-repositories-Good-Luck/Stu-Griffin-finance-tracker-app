import { recordStore } from '../model/record';
import { createSlice } from '@reduxjs/toolkit';
import { RecordStoreI } from '../types/record';

export const recordsSlice = createSlice({
	name: 'records',
	initialState: recordStore,
	reducers: {
		addRecord: (state: RecordStoreI, action): RecordStoreI => {
			const key: string = action.payload.key;
			state[key] = [...state[key], action.payload.state];
			return state;
		},
		setRecords: (state: RecordStoreI, action): RecordStoreI => {
			return {...state, ...action.payload};
		},
	},
});

export default recordsSlice.reducer;
export const { addRecord, setRecords } = recordsSlice.actions;