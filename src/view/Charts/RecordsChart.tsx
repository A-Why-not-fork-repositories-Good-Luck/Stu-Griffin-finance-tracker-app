import { useSelector } from 'react-redux';
import { RecordI } from '../../types/record';
import { RootState } from '../../types/redux';
import { RecordStoreI } from '../../types/record';
import { PieChart } from 'react-native-chart-kit';
import React, { useEffect, useState } from 'react';
import { RecordDataI } from '../../types/recordChart';
import { Dimensions, View, Text } from 'react-native';

const width = Dimensions.get('window').width;

const chartConfig = {
	color: () => 'black',
};

export default function RecordsChart() {
	const [chartData, setChartData] = useState<Array<RecordDataI>>([]);
	const records: RecordStoreI = useSelector((state: RootState) => state.records);

	useEffect(() => {
		const arr: Array<RecordDataI> = [];
		const outcomesKeys: Array<string> = Object.keys(records);
		
		outcomesKeys.map(async (el: string) => {
			if(records[el][0]) {
				arr.push({
					name: el,
					legendFontSize: 13,
					legendFontColor: 'black',
					color: `rgba(${records[el][0]?.color[0]}, ${records[el][0]?.color[1]}, ${records[el][0]?.color[2]}, 1)`,
					ammount: records[el].reduce((res: number, el: RecordI) => (el.recordType === 'outcome') ? res + +el.ammount : res, 0),
				});
			}
		});
		setChartData(arr);
	}, [records]);
	
	return (
		(chartData.length !== 0) ?
			<View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
				<PieChart
					height={220}
					width={width-25}
					data={chartData}
					paddingLeft={'0'}
					accessor={'ammount'}
					chartConfig={chartConfig}
					backgroundColor={'transparent'}
					style={{
						backgroundColor: 'white',
						borderRadius: 10,
					}}/>
			</View>
			:
			<></>
	);
}