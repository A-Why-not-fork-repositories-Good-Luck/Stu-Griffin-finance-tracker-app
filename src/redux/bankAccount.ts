import { createSlice } from '@reduxjs/toolkit';
import { bankAccountsStore } from '../model/bankAccount';

export const bankAccountsSlice = createSlice({
	name: 'bank-accounts',
	initialState: bankAccountsStore,
	reducers: {
		addBankAccount: (state, action) => {
			return [...state, action.payload];
		},
		setBankAccounts: (state, action) => {
			return [...state, ...action.payload];
		},
	},
});

export default bankAccountsSlice.reducer;
export const { addBankAccount, setBankAccounts } = bankAccountsSlice.actions;