import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import MeetingSummaryImg from '../images/MeetingSummaryImg.jpg'
import AddNewMeetingImg from '../images/AddNewMeetingImg.jpg'
import PresenceCheckImg from '../images/PresenceCheckImg.jpg'


function MeetingManagement() {
	const options = [
		<Link to='/TrackMeeting' className='link'> <Option optionName='מעקב נוכחים' imgAdd={PresenceCheckImg} /></Link>,
		<Link to='/MeetingSummary' className='link'>	<Option optionName='סיכומי מפגשים' imgAdd={MeetingSummaryImg} /></Link>,
		<Link to='/AddNewMeeting' className='link'>	<Option optionName='הוספת פגישה' imgAdd={AddNewMeetingImg} /></Link>
	];

	return (
		<div className='pageTemplate'>
			<h1> ניהול מפגשים</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/ManagerHomePage' className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default MeetingManagement;