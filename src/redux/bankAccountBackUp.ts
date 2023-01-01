import { createSlice } from '@reduxjs/toolkit';
import { BankAccountBackUpI } from '../types/bankAccountBackUp';
import { bankAccountsBackUpStore } from '../model/bankAccountBackUp';

export const bankAccountsBackUpSlice = createSlice({
	name: 'bank-accounts-backup',
	initialState: bankAccountsBackUpStore,
	reducers: {
		addBankAccountBackUp: (state:Array<BankAccountBackUpI>, action): Array<BankAccountBackUpI> => {
			return [...state, action.payload];
		},
		setBankAccountsBackUp: (state:Array<BankAccountBackUpI>, action): Array<BankAccountBackUpI> => {
			return [...state, ...action.payload];
		},
		changeBankAccountBackUp: (state:Array<BankAccountBackUpI>, action): Array<BankAccountBackUpI> => {
			const index: number = state.findIndex((el: BankAccountBackUpI) => el.id === action.payload.id && el.date === action.payload.date);
			state[index].ammount = (action.payload.recordType === 'income') ? (+state[index].ammount + +action.payload.ammount).toString() : (+state[index].ammount - +action.payload.ammount).toString();
			return state;
		},
		deleteBankAccountBackUp: (state:Array<BankAccountBackUpI>, action): Array<BankAccountBackUpI> => {
			state = state.filter((el: BankAccountBackUpI) => el.id !== action.payload);
			return state;
		},
		rewriteBankAccountBackUp: (state:Array<BankAccountBackUpI>, action): Array<BankAccountBackUpI> => {
			const index: number = state.findIndex((el: BankAccountBackUpI) => el.date === action.payload.date && el.id === action.payload.id);
			state[index].ammount = action.payload.ammount;
			return state;
		},
		deleteBankAccountsBackUp: (): Array<BankAccountBackUpI> => {
			return [];
		},
	},
});

export default bankAccountsBackUpSlice.reducer;
export const { addBankAccountBackUp, setBankAccountsBackUp, changeBankAccountBackUp, deleteBankAccountsBackUp, rewriteBankAccountBackUp, deleteBankAccountBackUp } = bankAccountsBackUpSlice.actions;