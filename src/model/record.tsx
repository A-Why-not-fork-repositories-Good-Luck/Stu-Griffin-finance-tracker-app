import React from 'react';
import { RecordI } from '../types/record';
import { TypeI } from '../types/recordTypes';
import RestaurantIcon from '../../assets/icons/RestaurantIcon';

export const types: Array<TypeI> = [
	{
		title: 'Bar and cafe',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Food and drinks',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Clothes and shoes',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Restaurant, fast-food',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Pharmacy',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Gifts',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Recreation',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'For house and garden',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Beauty and health',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Pets',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Rent',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Сommunal payments',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Public transport',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Taxi',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
	{
		title: 'Long trips',
		icon: <RestaurantIcon fill={'#236F57'}/>,
	},
];

export const recordFormState: RecordI = {
	id: '',
	type: '',
	date: '',
	comment: '',
	ammount: '',
	bankAccountId: '',
	recordType: 'income',
};

export const recordStore: Array<RecordI> = [];

export const recordTypes = ['Income', 'Outcome'];