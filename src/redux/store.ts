import recordsReducer from './records';
import balanceReducer from './balance';
import bankAccountReducer from './bankAccount';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		records: recordsReducer,
		balances: balanceReducer,
		bankAccounts: bankAccountReducer,
	} 
});