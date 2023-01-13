import { KeyboardType } from "react-native";

export interface InputComponentPropsI {
	value: string;
	title: string;
	keyboardType: KeyboardType;
	changeValueFunc: (value: string) => void;
}