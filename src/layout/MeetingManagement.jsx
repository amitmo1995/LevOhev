import React from 'react';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import AddNewMeetingImg from '../images/AddNewMeetingImg.jpg';
import PresenceCheckImg from '../images/PresenceCheckImg.jpg';
import HomePageButton from '../features/HomePageButton';
import { LogoutButton } from '../features/LogoutButton';

function MeetingManagement() {
	const options = [
		<Link to='/TrackMeeting' className='link'>
			{' '}
			<Option optionName='מעקב נוכחים' imgAdd={PresenceCheckImg} />
		</Link>,
		<Link to='/AddNewMeeting' className='link'>
			{' '}
			<Option optionName='הוספת פגישה' imgAdd={AddNewMeetingImg} />
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
			<h1> ניהול מפגשים</h1>
			<div className='optionsContainer'>{options}</div>
		</div>
	);
}

export default MeetingManagement;
