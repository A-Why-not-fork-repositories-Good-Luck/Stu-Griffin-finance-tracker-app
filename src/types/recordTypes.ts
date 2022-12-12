import { ReactNode } from 'react';

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