import React from 'react';
import Option from '../features/Option';
import { Link , useParams} from 'react-router-dom';
import UpdateExpenses from '../images/UpdateExpenses.jpg';
import addPayment from '../images/addPayment.jpeg';
import TrackExpensesAndIncome from '../images/TrackExpensesAndIncome.jpg';
import PaymentTracking from '../images/PaymentTracking.jpg'

import { useAuth } from '../firebase/firebase';
import { LogoutButton } from '../features/LogoutButton';

function HoaHomePage(props) {
	const params= useParams();
	let routToAddNewPayment="/AddNewPayment/"+params.building_id;
	let routToUpdateExpenses="/UpdateExpenses/"+params.building_id;
	let routToTrackIncomeExpenses="/TrackIncomeExpenses/"+params.building_id;
	let routToHoaTenantsPaymentTracking="/HoaTenantsPaymentTracking/"+params.building_id;

	


	const options = [
		<Link to={routToAddNewPayment} className='link'> <Option optionName='הוספת תשלום מדייר' imgAdd={addPayment} /> </Link>,
		<Link to={routToUpdateExpenses} className='link'> <Option optionName='עדכון הוצאה עבור הבניין' imgAdd={UpdateExpenses} /> </Link>,
		<Link to={routToTrackIncomeExpenses} className='link'> <Option optionName='מעקב הוצאות/הכנסות' imgAdd={TrackExpensesAndIncome}  /> </Link>,
		<Link to={routToHoaTenantsPaymentTracking} className='link'> <Option optionName='מעקב תשלום וועד בית' imgAdd={PaymentTracking}  /> </Link>
	];

	return (
		<div className='hoaHome'>
		<div className='pageTemplate'>
			<h1> {JSON.parse(localStorage.getItem("userConnected")).data.name} שלום</h1>
            <h1>יתרה : 1789 ש"ח</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/' className='link'>
				<LogoutButton />
			</Link>
		</div>
		</div>
	);
}

export default HoaHomePage;