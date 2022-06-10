import React from 'react';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import meetingImg from '../images/meetingImg.jpg';
import buildingManageImg from '../images/buildingManageImg.jpg';
import appointmentNewHOAImg from '../images/appointmentNewHOAImg.jpg';
import { useAuth } from '../firebase/firebase';
import { LogoutButton } from '../features/LogoutButton';

function ManagerHomePage(props) {
	const options = [
		<Link to='/ChooseBuilding' className='link'> <Option optionName='ניהול בניין' imgAdd={buildingManageImg} /> </Link>,
		<Link to='/MeetingManagement' className='link'> <Option optionName='פגישות' imgAdd={meetingImg} /> </Link>,
		<Link to='/AppointmentNewHOA' className='link'> <Option optionName='הוספת משתמש' imgAdd={appointmentNewHOAImg}  /> </Link>,
		<Link to='/SetMessage' className='link'> <Option optionName='שלח הודעה לוועדי בתים' imgAdd={appointmentNewHOAImg}  /> </Link>
	];

	return (
		<div className='pageTemplate'>
			<h1> {JSON.parse(localStorage.getItem("userConnected")).data.name} שלום</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/' className='link'>
				<LogoutButton />
			</Link>
		</div>
	);
}

export default ManagerHomePage;