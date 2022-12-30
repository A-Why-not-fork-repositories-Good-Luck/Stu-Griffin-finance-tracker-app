import { BalanceI } from '../types/Balance';
import { createSlice } from '@reduxjs/toolkit';
import { balanceStore } from '../model/balance';

export const balanceSlice = createSlice({
	name: 'balance',
	initialState: balanceStore,
	reducers: {
		setBalances: (state:Array<BalanceI>, action): Array<BalanceI> => {
			return [...state, ...action.payload];
		},
		changeBalance: (state:Array<BalanceI>, action): Array<BalanceI> => {
			const foundId = state.findIndex((el: BalanceI) => el.date === action.payload.date);
			(foundId >= 0) ? state[foundId].balance = action.payload.balance : state.push(action.payload);
			return state.sort((a: BalanceI, b: BalanceI): number => b.date < a.date ? 1 : -1);
		},
	},
});

export default balanceSlice.reducer;
export const { setBalances, changeBalance } = balanceSlice.actions;