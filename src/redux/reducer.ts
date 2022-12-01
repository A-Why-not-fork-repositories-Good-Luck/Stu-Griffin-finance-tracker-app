import { createSlice } from '@reduxjs/toolkit';
import { bankAccountsStore } from '../model/bankAccount';

export const bankAccountsSlice = createSlice({
	name: 'bank-accounts',
	initialState: bankAccountsStore,
	reducers: {
		// addBankAccount: (state, action) => {
		// 	return state;
		// },
		addBankAccount: (state) => {
			return state;
		},
	},
});

export default bankAccountsSlice.reducer;
export const { addBankAccount } = bankAccountsSlice.actions;