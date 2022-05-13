import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import meetingImg from '../images/meetingImg.jpg';
import buildingManageImg from '../images/buildingManageImg.jpg';
import appointmentNewHOAImg from '../images/appointmentNewHOAImg.jpg';
import { useAuth } from '../firebase/firebase';
import { LogoutButton } from '../features/LogoutButton';

function ManagerHomePage(props) {
	const currentUser=useAuth();
	const options = [
		<Link to='/ChooseBuilding' className='link'> <Option optionName='ניהול בניין' imgAdd={buildingManageImg} /> </Link>,
		<Link to='/MeetingManagement' className='link'> <Option optionName='פגישות' imgAdd={meetingImg} /> </Link>,
		<Link to='/AppointmentNewHOA' className='link'> <Option optionName='מינוי יו"ר וועד בית' imgAdd={appointmentNewHOAImg}  /> </Link>
	];

	return (
		<div className='pageTemplate'>
			<h1> {currentUser?.email} שלום</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/' className='link'>
				<LogoutButton />
			</Link>
		</div>
	);
}

export default ManagerHomePage;
