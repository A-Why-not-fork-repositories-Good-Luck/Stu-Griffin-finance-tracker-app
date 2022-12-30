import { RecordI } from '../types/Record';
import { ActionI } from '../types/reusable';

export function recordReducer(state: RecordI, {type, payload}: ActionI): RecordI {
	switch (type) {
	case 'add':
		return {...state, [payload.key]: payload.value};
	default:
		return state;
	}
}