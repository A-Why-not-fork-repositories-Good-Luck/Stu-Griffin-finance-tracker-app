import { RecordI } from '../types/record';
import { ActionI } from '../types/componentReducer';

export function recordReducer(state: RecordI, {type, payload}: ActionI) {
	switch (type) {
	case 'add':
		return {...state, [payload.key]: payload.value};
	default:
		return state;
	}
}