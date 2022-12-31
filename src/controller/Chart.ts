import { BalanceI } from '../types/Balance';
import { DateI, RecordDataI } from '../types/Chart';
import { RecordStoreI, RecordI } from '../types/Record';

export const constructDate = () => {
	const startDate: Date = new Date();
	startDate.setDate((new Date()).getDate()-7);
	return({
		end: JSON.parse(JSON.stringify(new Date())).split('T')[0],
		start: JSON.parse(JSON.stringify(startDate)).split('T')[0]
	});
};

export const getPercentageColor = (value: string) => {
	switch(value) {
	case '-':
		return {color: 'red'};
	case '+':
		return {color: 'green'};
	default:
		return {color: 'black'};
	}
};

export 	const calculatePercentage = (last: number, current: number) => {
	const result = {
		symbol: '',
		percantage: 0,
	};
	if(last && current) {
		result.symbol = (last > current) ? '-' : '+';
		result.percantage = +(((last-current)*100)/last).toFixed(2);
	}
	return (result);
};

export const createBalanceData = (arr: Array<BalanceI>, date: DateI) => {
	const labels: Array<string> = [], datasets: Array<number> = [];
	if(arr.length !== 0) {
		arr.map((el: BalanceI) => {
			if(el.date >= date.start && el.date <= date.end) {
				datasets.push(el.balance);
				labels.push(el.date.split('-').reverse().slice(0, 2).join('-'));
			}
		});
	} else {
		labels.push('');
		datasets.push(0);
	}
	return { labels, datasets };
};

export const createRecordData = (records: RecordStoreI, date: DateI) => {
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

export const calculateFullAmmount = (arr: RecordStoreI, date: DateI): number => {
	let ammount = 0;
	Object.keys(arr).map((el: string) => {
		arr[el].map((el: RecordI) => {
			if(el.date > date.start || el.date < date.end) {
				switch(el.recordType) {
				case 'income':
					ammount -= +el.ammount;
					break;
				case 'outcome': 
					ammount += +el.ammount;
					break;
				default: 
					break;
				}
			}
		});
	});
	return(ammount);
};