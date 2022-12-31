import { createSlice } from '@reduxjs/toolkit';
import { BankAccountI } from '../types/BankAccount';
import { bankAccountsStore } from '../model/bankAccount';

export const bankAccountsSlice = createSlice({
	name: 'bank-accounts',
	initialState: bankAccountsStore,
	reducers: {
		addBankAccount: (state:Array<BankAccountI>, action): Array<BankAccountI> => {
			return [...state, action.payload];
		},
		setBankAccounts: (state:Array<BankAccountI>, action): Array<BankAccountI> => {
			return [...state, ...action.payload];
		},
		changeBankAccount: (state:Array<BankAccountI>, action): Array<BankAccountI> => {
			const index: number = state.findIndex((el: BankAccountI) => el.id === action.payload.bankAccountId);
			state[index].ammount = (action.payload.recordType === 'income') ? (+state[index].ammount + +action.payload.recordAmmount).toString() : (+state[index].ammount - +action.payload.recordAmmount).toString();
			return state;
		},
		deleteBankAccounts: (state:Array<BankAccountI>, action): Array<BankAccountI> => {
			state = state.filter((el: BankAccountI) => el.id !== action.payload);
			return state;
		},
		rewriteBankAccounts: (state:Array<BankAccountI>, action): Array<BankAccountI> => {
			const index: number = state.findIndex((el: BankAccountI) => el.id === action.payload.id);
			state[index] = action.payload;
			return state;
		},
	},
});

export default bankAccountsSlice.reducer;
export const { deleteBankAccounts, addBankAccount, setBankAccounts, changeBankAccount, rewriteBankAccounts } = bankAccountsSlice.actions;