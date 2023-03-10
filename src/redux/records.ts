import { recordStore } from "../model/record";
import { createSlice } from "@reduxjs/toolkit";
import { RecordI, RecordStoreI } from "../types/Record";

export const recordsSlice = createSlice({
	name: "records",
	initialState: recordStore,
	reducers: {
		deleteRecords: (): RecordStoreI => {
			return {};
		},
		addRecord: (state: RecordStoreI, action): RecordStoreI => {
			const key: string = action.payload.key;
			state[key] = [...state[key], action.payload.state];
			return state;
		},
		putRecord: (state: RecordStoreI, action): RecordStoreI => {
			const key: string = action.payload.key;
			const index: number = state[key].findIndex((el: RecordI) => el.id === action.payload.state.id);
			state[key][index] = action.payload.state;
			return state;
		},
		setRecords: (state: RecordStoreI, action): RecordStoreI => {
			return {...state, ...action.payload};
		},
		deleteRecord: (state: RecordStoreI, action): RecordStoreI => {
			state[action.payload.parentType] = state[action.payload.parentType].filter((el: RecordI) => el.id !== action.payload.id);
			return state;
		},
	},
});

export default recordsSlice.reducer;
export const { addRecord, setRecords, putRecord, deleteRecords, deleteRecord } = recordsSlice.actions;