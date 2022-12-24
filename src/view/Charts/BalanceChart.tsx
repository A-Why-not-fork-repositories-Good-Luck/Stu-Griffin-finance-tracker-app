import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';
import { BalanceI } from '../../types/balance';
import { LineChart } from 'react-native-chart-kit';
import SettingIcon from '../../../assets/icons/SettingIcon';
import React, { useState, useEffect, ReactElement } from 'react';
import { createDataAndLabel } from '../../controller/balanceChart';
import PeriodChoosingComponent from '../reusable/PeriodChoosingComponent';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';

const width = Dimensions.get('window').width;

export interface DateI {
	end: string;
	start: string;
}

export default function BalanceChart(): ReactElement {
	const [date, setDate] = useState<DateI>({
		end: '',
		start: '',
	});
	const [percentage, setPercentage] = useState<number>(0);
	const [label, setLabel] = useState<Array<string>>(['']);
	const [dataset, setDataset] = useState<Array<number>>([0]);
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const [percentageSymbol, setPercentageSymbol] = useState<string>('');
	const balance: Array<BalanceI> = useSelector((state: RootState) => state.balances);

	useEffect(() => {
		const startDate: Date = new Date();
		startDate.setDate((new Date()).getDate()-7);
		setDate({end: JSON.parse(JSON.stringify(new Date())).split('T')[0], start: JSON.parse(JSON.stringify(startDate)).split('T')[0]});
	}, []);

	useEffect(() => {
		const { labels, datasets } = createDataAndLabel(balance, date);
		setLabel(labels);
		setDataset(datasets);
		calculatePercentage(balance[balance.length-1]?.balance, balance[balance.length-2]?.balance);
	}, [balance, date]);
	
	const getPercentageColor = (value: string) => {
		switch(value) {
		case '-':
			return {color: 'red'};
		case '+':
			return {color: 'green'};
		default:
			return {color: 'black'};
		}
	};

	const calculatePercentage = (last: number, current: number) => {
		last = 8595, current = 764;
		if(last && current) {
			setPercentage(+(((last-current)*100)/last).toFixed(2));
			(last > current) ? setPercentageSymbol('-') : setPercentageSymbol('+');
		}
	};
	
	return(
		(balance.length !== 0) 
			?
			<View style={styles.card}>
				<View style={styles.area}>
					<Text style={styles.title}>Balance trend</Text>
					<TouchableOpacity onPress={() => setModalStatus(true)} style={styles.settingBox}>
						<SettingIcon width={20} height={20} fill={'black'}/>
					</TouchableOpacity>
				</View>
				<View style={styles.area}>
					<View>
						<Text style={styles.infoTitle}>Today</Text>
						<Text style={styles.infoValue}>{balance[balance.length-1]?.balance} UAH</Text>
					</View>
					<View>
						<Text style={styles.infoTitle}>vs past period</Text>
						<Text style={[styles.infoValue, getPercentageColor(percentageSymbol)]}>{percentageSymbol}{percentage}%</Text>
					</View>
				</View>
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
				<PeriodChoosingComponent
					closeModal={() => {
						setModalStatus(false);
					}}
					modalStatus={modalStatus}
					saveChanges={(startDate: string, endDate: string) => {
						setDate({
							end: endDate,
							start: startDate,
						});
					}}
				/>
			</View>
			:
			<></>
	);
}

const styles = StyleSheet.create({
	area: {
		marginTop: 20,
		width: width-45,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	card: {
		padding: 10,
		width: width-25,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: 'white',	
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	infoTitle: {
		fontSize: 15,
		color: 'gray',
	},
	infoValue: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	settingBox: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});