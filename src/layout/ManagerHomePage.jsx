import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import meetingImg from '../images/meetingImg.jpg';
import buildingManageImg from '../images/buildingManageImg.jpg';

function ManagerHomePage(props) {
	const options = [
		<Link to='/ChooseBuilding' className='link'>
			<Option optionName='ניהול בניין' imgAdd={buildingManageImg} />
		</Link>,
		<Link to='/MeetingManagement' className='link'>
			<Option optionName='פגישות' imgAdd={meetingImg} />
		</Link>,
		,
	];

	return (
		<div className='pageTemplate'>
			<h1>שלום ראם</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/' className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default ManagerHomePage;
