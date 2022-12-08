import React from 'react';
import MainPage from './view/MainPage';
import CreateRecord from './view/CreateRecord';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={
						{
							headerShown:false
						}
					}
					name="main-page"
					component={MainPage}
				/>
				<Stack.Screen
					options={
						{
							title: 'Add record',
						}
					}
					component={CreateRecord}
					name="create-record-page"
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;