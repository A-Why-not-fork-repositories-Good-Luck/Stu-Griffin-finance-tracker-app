import { ReactNode } from "react";

export interface DateI {
	end: string;
	start: string;
}

export interface TypeI {
	title: string;
	icon : ReactNode;
	color: Array<number>;
	data: Array<TypeItem>;
}

export interface TypeItem {
	title: string;
	parent: string;
	icon : ReactNode;
	color: Array<number>;
}

export interface RecordDataI {
	name: string;
	color: string;
	ammount: number;
	legendFontSize: number;
	legendFontColor: string;
}

export interface ConstructDateI {
	end: string;
	start: string;
}

export interface BalanceChartDataI {
	labels: Array<string>;
	datasets: Array<number>;
}

export interface CreateBalanceDataI {
	labels: Array<string>;
	datasets: Array<number>;
}