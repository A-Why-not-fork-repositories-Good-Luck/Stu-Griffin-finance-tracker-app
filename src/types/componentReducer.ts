export interface ActionI {
	type: string;
	payload: PayloadI;
}

export interface PayloadI {
	key: string;
	value: string;
}