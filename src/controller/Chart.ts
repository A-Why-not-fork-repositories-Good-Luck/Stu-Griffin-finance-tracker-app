import { RecordStoreI, RecordI } from '../types/Record';
import { BankAccountBackUpI } from '../types/bankAccountBackUp';
import { DateI, RecordDataI, ConstructDateI, CreateBalanceDataI } from '../types/Chart';

export const constructDate = (): ConstructDateI => {
	const startDate: Date = new Date();
	startDate.setDate((new Date()).getDate()-7);
	return({
		end: JSON.parse(JSON.stringify(new Date())).split('T')[0],
		start: JSON.parse(JSON.stringify(startDate)).split('T')[0]
	});
};

export const getBalance = (arr: Array<BankAccountBackUpI>): number => {
	arr = arr.filter((el: BankAccountBackUpI) => el.date === JSON.parse(JSON.stringify(new Date())).split('T')[0]);
	return(arr.reduce((res: number, el: BankAccountBackUpI) => res += +el.ammount, 0));
};

export const calculateFullAmmount = (arr: RecordStoreI, date: DateI): number => {
	let ammount = 0;
	Object.keys(arr).map((el: string) => {
		arr[el].map((el: RecordI) => {
			if(el.date > date.start || el.date < date.end) {
				(el.recordType === 'outcome') && (ammount += +el.ammount);
			}
		});
	});
	return(ammount);
};

export const createRecordData = (records: RecordStoreI, date: DateI): Array<RecordDataI> => {
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

export const createBalanceData = (arr: Array<BankAccountBackUpI>, date: DateI): CreateBalanceDataI => {
	const labels: Array<string> = [], datasets: Array<number> = [];
	arr = arr.filter((el: BankAccountBackUpI) => el.date >= date.start && el.date <= date.end);
	arr.sort((a, b) => (new Date(a.date) - new Date(b.date)));
	let ammount = 0;
	arr.map((el: BankAccountBackUpI, id: number) => {
		ammount += +el.ammount;
		if(el.date !== arr[id+1]?.date) {
			labels.push(el.date.split('-').reverse().slice(0, 2).join('-'));
			datasets.push(ammount);
			ammount = 0;
		}
	});
	return { labels, datasets };
};