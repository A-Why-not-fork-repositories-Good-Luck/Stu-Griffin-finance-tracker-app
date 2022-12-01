import bankAccountReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		bankAccounts: bankAccountReducer
	},
});