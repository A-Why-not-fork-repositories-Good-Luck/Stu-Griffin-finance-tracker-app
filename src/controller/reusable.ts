import { DispatchStateI } from "../types/reusable";
import { MessageType, showMessage } from "react-native-flash-message";

export const convertedDate = (date: Date|undefined): string => {
	return JSON.parse(JSON.stringify(date)).split("T")[0];
};

export const notification = (type: MessageType, message: string): void => {
	showMessage({
		type: type,
		message: message,
	});
};

export const stateAction = (dispatchState: DispatchStateI, type: string, key: string, value: string|number[]): void => {	
	dispatchState({
		type: type,
		payload: {
			key: key,
			value: value,
		}
	});
};