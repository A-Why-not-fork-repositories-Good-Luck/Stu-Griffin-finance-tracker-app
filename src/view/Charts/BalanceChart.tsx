import { useSelector } from 'react-redux';
import { DateI } from '../../types/Chart';
import { RootState } from '../../types/redux';
import { BalanceI } from '../../types/Balance';
import { LineChart } from 'react-native-chart-kit';
import { createBalanceData } from '../../controller/Chart';
import SettingIcon from '../../../assets/icons/SettingIcon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React, { useState, useEffect, ReactElement } from 'react';
import PeriodChoosingComponent from '../reusable/PeriodChoosingComponent';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { getPercentageColor, constructDate, calculatePercentage } from '../../controller/Chart';

const width = Dimensions.get('window').width;

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
		setDate(constructDate());
	}, []);

	useEffect(() => {
		const { labels, datasets } = createBalanceData(balance, date);
		setLabel(labels);
		setDataset(datasets);
		const {symbol, percantage } = calculatePercentage(balance[balance.length-1]?.balance, balance[balance.length-2]?.balance);
		setPercentage(percantage);
		setPercentageSymbol(symbol);
	}, [balance, date]);
	
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
		fontWeight: 'bold',
		fontSize: RFPercentage(3.5),
	},
	infoTitle: {
		color: 'gray',
		fontSize: RFPercentage(2),
	},
	infoValue: {
		fontWeight: 'bold',
		fontSize: RFPercentage(2.5),
	},
	settingBox: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});