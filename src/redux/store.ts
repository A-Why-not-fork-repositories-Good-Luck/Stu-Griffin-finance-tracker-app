import recordsReducer from "./records";
import bankAccountReducer from "./bankAccount";
import { configureStore } from "@reduxjs/toolkit";
import bankAccountsBackUpSlice from "./bankAccountBackUp";

export const store = configureStore({
	reducer: {
		records: recordsReducer,
		bankAccounts: bankAccountReducer,
		bankAccountsBackUp: bankAccountsBackUpSlice,
	} 
});