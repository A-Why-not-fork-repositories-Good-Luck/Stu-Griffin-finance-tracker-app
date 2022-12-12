export interface RecordI {
	id: string;
	type: string;
	date: string;
	comment: string;
	ammount: string;
	recordType: string;
	color: Array<number>;
	bankAccountId: string;
}

export interface RecordStoreI {
	[key: string]: Array<RecordI>;
}