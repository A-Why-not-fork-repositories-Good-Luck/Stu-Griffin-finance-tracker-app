import { BalanceI } from '../types/balance';
import { DateI } from '../view/Charts/RecordsChart';

export const createDataAndLabel = (arr: Array<BalanceI>, date: DateI) => {
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
	console.log(labels, datasets);
	return { labels, datasets };
};