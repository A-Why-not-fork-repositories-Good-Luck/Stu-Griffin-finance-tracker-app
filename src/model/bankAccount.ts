import { BankAccountI } from "../types/BankAccount";

export const bankAccountFormState: BankAccountI = {
	id: "",
	date: "",
	title: "",
	ammount: "",
	currency: "",
};

export const bankAccountsStore: Array<BankAccountI> = [];

export const currency: Array<string> = ["UAH"];