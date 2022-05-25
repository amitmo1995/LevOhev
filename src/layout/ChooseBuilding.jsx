import React from 'react';
import { Link } from 'react-router-dom';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import BackButton from '../features/BackButton';
import HomePageButton from '../features/HomePageButton'


function ChooseBuilding() {

	let [options, optionName] = [[], ''];
	for (let i = 1; i <= 18; i++) {
		let option_Name = 'בניין ' + i;
		// options[i] = <Option optionName={option_Name} imgAdd={buildingImg} />;
		options[i] = (
			<Link to='/BuildingOperation' className='link' key={i} onClick={() => 
			localStorage.setItem('chosen',i)}>
				{' '}
				<Option optionName={option_Name} imgAdd={buildingImg} />
			</Link>
		);
	}
	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
			<h1>בחר בניין</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/ManagerHomePage' className='link link-button'>
				<BackButton />
			</Link>
		</div>
	);
}

export default ChooseBuilding;
