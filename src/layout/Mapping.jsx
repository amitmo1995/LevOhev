import React from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link } from 'react-router-dom';
import AdultsImg from '../images/AdultsImg.jpg'
import DisabledImg from '../images/Disabled.jpg'
import ChildrenImg from '../images/Children.jpg'
import HomePageButton from '../features/HomePageButton'

function Mapping() {
	const options = [
		<Option optionName='מבוגרים - 20' imgAdd={AdultsImg} />,
		<Option optionName='נכים - 1' imgAdd={DisabledImg} />,
		<Option optionName='ילדים - 21' imgAdd={ChildrenImg} />
	];

	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
			<h1> מיפוי הבניין </h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/BuildingOperation' className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default Mapping;