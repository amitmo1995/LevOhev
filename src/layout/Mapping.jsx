import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link, useParams } from 'react-router-dom';
import AdultsImg from '../images/AdultsImg.jpg';
import DisabledImg from '../images/Disabled.jpg';
import ChildrenImg from '../images/Children.jpg';
import HomePageButton from '../features/HomePageButton';
import { LogoutButton } from '../features/LogoutButton';

function Mapping() {
	const params = useParams();
	let routBack = '/BuildingOperation/' + params.building_id;
	const options = [
		<Option optionName='מבוגרים - 20' imgAdd={AdultsImg} />,
		<Option optionName='נכים - 1' imgAdd={DisabledImg} />,
		<Option optionName='ילדים - 21' imgAdd={ChildrenImg} />,
	];

	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'>
				<HomePageButton />
			</Link>
			<Link to='/' className='link'>
				<LogoutButton />
			</Link>
			<h1> מיפוי הבניין </h1>
			<div className='optionsContainer'>{options}</div>
			<Link to={routBack} className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default Mapping;
