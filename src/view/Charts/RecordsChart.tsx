import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';
import { Dimensions, View } from 'react-native';
import { RecordStoreI } from '../../types/record';
import { PieChart } from 'react-native-chart-kit';
import { RecordDataI } from '../../types/recordChart';
import { createData } from '../../controller/recordsChart';
import React, { ReactElement, useEffect, useState } from 'react';

const width = Dimensions.get('window').width;

const chartConfig = {
	color: () => 'black',
};

export default function RecordsChart(): ReactElement {
	const [chartData, setChartData] = useState<Array<RecordDataI>>([]);
	const records: RecordStoreI = useSelector((state: RootState) => state.records);
	
	useEffect(() => {
		setChartData(createData(records));
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