import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import DepositTrackGraphImg from '../images/DepositTrackGraphImg.jpg'
import ScholarshipPayment from '../images/ScholarshipPayment.jpg'
import financeImg from '../images/financeImg.jpg'



function FinancialManagement
() {
	const options = [
		<Link to='/TrackingPayment' className='link'> <Option optionName='מעקב תשלומי וועד' imgAdd={financeImg} /></Link>,
		<Link to='/BuildingExpenses' className='link'>	<Option optionName='מעקב הוצאות/הכנסות' imgAdd={DepositTrackGraphImg} /></Link>,
		<Link to='/GivingScholarship' className='link'>	<Option optionName='מתן מלגה' imgAdd={ScholarshipPayment} /></Link>
	];

	return (
		<div className='pageTemplate'>
            <h1>ניהול כלכלי של ועד הבית</h1>
			<h1>יתרה : 2332 שח</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/BuildingOperation' className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default FinancialManagement;