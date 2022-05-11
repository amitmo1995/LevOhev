import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import meetingImg from '../images/meetingImg.jpg';
import buildingManageImg from '../images/buildingManageImg.jpg';

function ManagerHomePage(props) {
	const options = [
		<Option optionName='ניהול בניין' imgAdd={buildingManageImg} />,
		<Option optionName='פגישות' imgAdd={meetingImg} />,
	];

	return (
		<div className='pageTemplate'>
			<h1>שלום ראם</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/' className='link'>
				{' '}
				<BackButton />{' '}
			</Link>
		</div>
	);
}

export default ManagerHomePage;
