import recordsReducer from './records';
import bankAccountReducer from './bankAccount';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		records: recordsReducer,
		bankAccounts: bankAccountReducer,
	} 
});