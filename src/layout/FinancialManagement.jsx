import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link , useParams } from 'react-router-dom';
import DepositTrackGraphImg from '../images/DepositTrackGraphImg.jpg'
import ScholarshipPayment from '../images/ScholarshipPayment.jpg'
import financeImg from '../images/financeImg.jpg'
import HomePageButton from '../features/HomePageButton'



function FinancialManagement
() {

	const params= useParams();


	let routToTrackingPayment="/TrackingPayment/"+params.building_id;
	let routToBuildingExpenses="/BuildingExpenses/"+params.building_id;
	let routToGivingScholarship="/GivingScholarship/"+params.building_id;
	let routBack="/BuildingOperation/"+params.building_id;



	const options = [
		<Link to={routToTrackingPayment} className='link'> <Option optionName='מעקב תשלומי וועד' imgAdd={financeImg} /></Link>,
		<Link to={routToBuildingExpenses} className='link'>	<Option optionName='מעקב הוצאות/הכנסות' imgAdd={DepositTrackGraphImg} /></Link>,
		<Link to={routToGivingScholarship} className='link'>	<Option optionName='מתן מלגה' imgAdd={ScholarshipPayment} /></Link>
	];

	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
            <h1>ניהול כלכלי של ועד הבית</h1>
			<h1>יתרה : 2332 שח</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to={routBack} className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default FinancialManagement;