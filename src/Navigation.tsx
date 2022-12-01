import * as React from 'react';
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
					name="main-page"
					component={MainPage}
				/>
				<Stack.Screen
					component={CreateRecord}
					name="create-record-page"
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;