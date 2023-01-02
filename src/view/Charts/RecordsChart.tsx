import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';
import { RecordStoreI } from '../../types/Record';
import { PieChart } from 'react-native-chart-kit';
import { RecordDataI, DateI } from '../../types/Chart';
import SettingIcon from '../../../assets/icons/SettingIcon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React, { ReactElement, useEffect, useState } from 'react';
import PeriodChoosingComponent from '../reusable/PeriodChoosingComponent';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { constructDate, createRecordData, calculateFullAmmount } from '../../controller/Chart';

const width = Dimensions.get('window').width;

export default function RecordsChart(): ReactElement {
	const [date, setDate] = useState<DateI>({
		end: '',
		start: '',
	});
	const [fullAmmount, setFullAmmount] = useState<number>(0);
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const [chartData, setChartData] = useState<Array<RecordDataI>>([]);
	const records: RecordStoreI = useSelector((state: RootState) => state.records);

	useEffect(() => {
		setDate(constructDate());
	}, []);

	useEffect(() => {
		setChartData(createRecordData(records, date));
		setFullAmmount(calculateFullAmmount(records, date));
	}, [records, date]);

	return (
		<View style={styles.card}>
			<View style={styles.area}>
				<Text style={styles.title}>Expenses structure</Text>
				<TouchableOpacity onPress={() => setModalStatus(true)} style={styles.settingBox}>
					<SettingIcon width={20} height={20} fill={'black'}/>
				</TouchableOpacity>
			</View>
			{
				(chartData.length !== 0) ?
					<>
						<View style={styles.area}>
							<View>
								<Text style={styles.infoTitle}>Last 30 days</Text>
								<Text style={styles.infoValue}>{fullAmmount} UAH</Text>
							</View>
						</View>
						<PieChart
							height={220}
							width={width-25}
							data={chartData}
							paddingLeft={'0'}
							accessor={'ammount'}
							chartConfig={{
								color: () => 'black',
							}}
							backgroundColor={'transparent'}
						/>
					</> :
					<Text style={{fontSize: 22.5, color: 'red', fontWeight: 'bold', textAlign: 'center', marginVertical: 10}}>You have no records in this period of time or actually</Text>
			}
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