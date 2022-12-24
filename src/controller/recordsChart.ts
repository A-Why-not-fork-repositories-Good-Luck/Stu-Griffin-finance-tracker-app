import { RecordDataI } from '../types/recordChart';
import { DateI } from '../view/Charts/RecordsChart';
import { RecordStoreI, RecordI } from '../types/record';

export const createData = (records: RecordStoreI, date: DateI) => {
	const arr: Array<RecordDataI> = [];
	const outcomesKeys: Array<string> = Object.keys(records);
	outcomesKeys.map(async (el: string) => {
		if(records[el][0]) {
			if(records[el][0].date >= date.start && records[el][0].date <= date.end) {
				arr.push({
					name: el,
					legendFontSize: 13,
					legendFontColor: 'black',
					color: `rgba(${records[el][0]?.color[0]}, ${records[el][0]?.color[1]}, ${records[el][0]?.color[2]}, 1)`,
					ammount: records[el].reduce((res: number, el: RecordI) => (el.recordType === 'outcome') ? res + +el.ammount : res, 0),
				});
			}
		}
	});
	return(arr);
};