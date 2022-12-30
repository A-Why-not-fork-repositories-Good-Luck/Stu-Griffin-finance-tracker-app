import { PropsI } from './reusable';

export interface PeriodChoosingComponentPropsI extends PropsI {
	saveChanges: (startDate: string, endDate: string) => void;
}