import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';
import { BalanceI } from '../../types/balance';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import React, { useState, useEffect, ReactElement } from 'react';
import { createDataAndLabel } from '../../controller/balanceChart';

const width = Dimensions.get('window').width;

export default function BalanceChart(): ReactElement {
	const [label, setLabel] = useState<Array<string>>(['']);
	const [dataset, setDataset] = useState<Array<number>>([0]);
	const balance: Array<BalanceI> = useSelector((state: RootState) => state.balances);

	useEffect(() => {
		const { labels, datasets } = createDataAndLabel(balance);
		setLabel(labels);
		setDataset(datasets);
	}, [balance]);

	return(
		(balance.length !== 0) 
			?
			<View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
				<LineChart
					fromZero={true}
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
			:
			<></>
	);
}