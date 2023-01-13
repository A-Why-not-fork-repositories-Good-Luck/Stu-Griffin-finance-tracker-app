import { PropsI } from "./reusable";

export interface CardItemI {
	item: BankAccountI;
}

export interface BankAccountI {
	id: string;
	date: string;
	title: string;
	ammount: string;
	currency: string;
}

export interface BankAccountListPropsI extends PropsI {
	saveChanges: (item: string) => void;
}

export interface CreateEditBankAccountPropsI extends PropsI {
	cardId: string;
}