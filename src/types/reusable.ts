export interface PropsI {
	modalStatus: boolean;
	closeModal: () => void;
}

export interface ActionI {
	type: string;
	payload: PayloadI;
}

export interface PayloadI {
	key: string;
	value: string|Array<number>;
}