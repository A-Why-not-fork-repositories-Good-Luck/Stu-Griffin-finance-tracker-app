import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';

const width = Dimensions.get('window').width;

export default function BalanceChart() {
	const [label, setLabel] = useState<Array<string>>(['']);
	const [dataset, setDataset] = useState<Array<number>>([0]);
	const balance = useSelector((state: RootState) => state.balances);

	useEffect(() => {
		const labels: Array<string> = [''], datasets: Array<number> = [0];
		if(balance.length !== 0) {
			balance.map((el: any) => {
				datasets.push(el.balance);
				labels.push(el.date.split('-').reverse().slice(0, 2).join('-'));
			});
		} else {
			labels.push('');
			datasets.push(0);
		}
		setLabel(labels);
		setDataset(datasets);
	}, [balance]);

	return(
		<View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
			<LineChart
				bezier
				data={{
					labels: label,
					datasets: [
						{
							data: dataset,
							color:() => '#0090E7',
						}
					],
				}}
				style={{
					padding: 10,
					borderRadius: 10,
					backgroundColor: 'white',
				}}
				height={256}
				chartConfig={{
					strokeWidth: 2,
					barPercentage: 0.5,
					color: () => 'black',
					backgroundGradientTo: 'white',
					backgroundGradientFrom: 'white',
					useShadowColorFromDataset: true,
					
				}}
				width={width-45}
				withVerticalLines={false}
				verticalLabelRotation={30}
			/>
		</View>
	);
}