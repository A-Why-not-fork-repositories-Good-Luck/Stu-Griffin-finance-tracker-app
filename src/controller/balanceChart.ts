import { BalanceI } from '../types/balance';

export const createDataAndLabel = (arr: Array<BalanceI>) => {
	const labels: Array<string> = [], datasets: Array<number> = [];
	if(arr.length !== 0) {
		arr.map((el: BalanceI) => {
			datasets.push(el.balance);
			labels.push(el.date.split('-').reverse().slice(0, 2).join('-'));
		});
	} else {
		labels.push('');
		datasets.push(0);
	}
	return { labels, datasets };
};