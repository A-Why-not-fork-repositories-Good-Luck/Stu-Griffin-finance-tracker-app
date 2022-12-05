import { createSlice } from '@reduxjs/toolkit';
import { BankAccountI } from '../types/bankAccount';
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
		changeBankAccount: (state, action) => {
			const index: number = state.findIndex((el: BankAccountI) => el.id === action.payload.bankAccountId);
			state[index].ammount = (action.payload.recordType === 'income') ? (+state[index].ammount + +action.payload.recordAmmount).toString() : (+state[index].ammount - +action.payload.recordAmmount).toString();
			return state;
		},
	},
});

export default bankAccountsSlice.reducer;
export const { addBankAccount, setBankAccounts, changeBankAccount } = bankAccountsSlice.actions;