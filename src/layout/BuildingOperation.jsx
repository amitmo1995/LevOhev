import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import BuildingMappingImg from '../images/BuildingMappingImg.jpeg'
import NewHOAImg from '../images/NewHOAImg.jpeg'
import financeImg from '../images/financeImg.jpg'



function BuildingOperation() {
	const options = [
		<Link to='/FinancialManagement' className='link'> <Option optionName='ניהול כלכלי' imgAdd={financeImg} /></Link>,
		<Link to='/Mapping' className='link'>	<Option optionName='מיפוי הבניין' imgAdd={BuildingMappingImg} /></Link>,
	];

	return (
		<div className='pageTemplate'>
			<h1>ביצוע פעולות עבור הבניין</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/ChooseBuilding' className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default BuildingOperation;