import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { LogoutButton } from '../features/LogoutButton';
import { Link, useParams } from 'react-router-dom';
import BuildingMappingImg from '../images/BuildingMappingImg.jpeg';
import financeImg from '../images/financeImg.jpg';
import addNew from '../images/new.jpg';
import HomePageButton from '../features/HomePageButton';

function BuildingOperation() {
	const params = useParams();

	let routToFinancialManagement = '/FinancialManagement/' + params.building_id+"/"+params.building_name;
	let routToMapping = '/Mapping/' + params.building_id+"/"+params.building_name;
	let routToAddNeighbors = '/AddNeighbors/' + params.building_id+"/"+params.building_name;


	function GetBuilding(){
		const param=useParams();
		let temp=param.building_name.split(" ");
		if(temp[1]=="A")
		    temp[1]="א";
		else if(temp[1]=="B")
		    temp[1]="ב";
		temp=temp.join(" ");
		return temp;
	}

	const options = [
		<Link to={routToFinancialManagement} className='link'>
			{' '}
			<Option optionName='ניהול כלכלי' imgAdd={financeImg} />
		</Link>,
		<Link to={routToMapping} className='link'>
			{' '}
			<Option optionName='מיפוי הבניין' imgAdd={BuildingMappingImg} />
		</Link>,
		<Link to={routToAddNeighbors} className='link'>
			{' '}
			<Option optionName='הוספת דייר לבניין' imgAdd={addNew} />{' '}
		</Link>,
	];

	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'>
				<HomePageButton />
			</Link>
			<Link to='/' className='link'>
				<LogoutButton />
			</Link>
			<h1>({GetBuilding()}) - ביצוע פעולות עבור בניין</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/ChooseBuilding' className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default BuildingOperation;
