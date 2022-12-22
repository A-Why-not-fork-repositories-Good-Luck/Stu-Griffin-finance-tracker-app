import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import SettingIcon from '../../../assets/icons/SettingIcon';
import { RecordI, RecordStoreI } from '../../types/record';
import { PieChart } from 'react-native-chart-kit';
import { RecordDataI } from '../../types/recordChart';
import { createData } from '../../controller/recordsChart';
import React, { ReactElement, useEffect, useState } from 'react';
import { BalanceI } from '../../types/balance';

const width = Dimensions.get('window').width;

const chartConfig = {
	color: () => 'black',
};

export default function RecordsChart(): ReactElement {
	const [percentage, setPercentage] = useState<number>(0);
	const [fullAmmount, setFullAmmount] = useState<number>(0);
	const [chartData, setChartData] = useState<Array<RecordDataI>>([]);
	const [percentageSymbol, setPercentageSymbol] = useState<string>('');
	const records: RecordStoreI = useSelector((state: RootState) => state.records);

	useEffect(() => {
		setChartData(createData(records));
		calculateFullAmmount(records);
	}, [records]);
	
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

	const calculateFullAmmount = (arr: RecordStoreI) => {
		let ammount = 0;
		Object.keys(arr).map((el: string) => {
			arr[el].map((el: RecordI) => {
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
			});
		});
		setFullAmmount(ammount);
	};

	return (
		(chartData.length !== 0) ?
			<View style={styles.card}>
				<View style={styles.area}>
					<Text style={styles.title}>Records structure</Text>
					<TouchableOpacity onPress={() => console.log('sdvsd')} style={styles.settingBox}>
						<SettingIcon width={20} height={20} fill={'black'}/>
					</TouchableOpacity>
				</View>
				<View style={styles.area}>
					<View>
						<Text style={styles.infoTitle}>Last 30 days</Text>
						<Text style={styles.infoValue}>{fullAmmount} UAH</Text>
					</View>
					<View>
						<Text style={styles.infoTitle}>vs past period</Text>
						<Text style={[styles.infoValue, getPercentageColor(percentageSymbol)]}>{percentageSymbol}{percentage}%</Text>
					</View>
				</View>
				<PieChart
					height={220}
					width={width-25}
					data={chartData}
					paddingLeft={'0'}
					accessor={'ammount'}
					chartConfig={chartConfig}
					backgroundColor={'transparent'}
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