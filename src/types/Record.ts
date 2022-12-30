import { ReactNode } from 'react';
import { PropsI } from './reusable';
import { TypeItem } from '../types/Chart';

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

export interface RecordTypeItemI {
	title: {
		title: string;
		parent: string;
		icon: ReactNode;
		color: Array<number>;
	}
}

export interface RecordTypeSectionHeaderI {
	section: {
		title: string;
		icon: ReactNode;
		color: Array<number>;
		data: Array<TypeItem>;
	}
}

export interface RecordTypesListPropsI extends PropsI {
	saveKey: (el: string) => void;
	saveChanges: (key: string, value: string|Array<number>) => void;
}