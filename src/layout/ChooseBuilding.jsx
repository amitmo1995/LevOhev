import React from 'react';
import { Link } from 'react-router-dom';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import BackButton from '../features/BackButton';
import HomePageButton from '../features/HomePageButton';
import { LogoutButton } from '../features/LogoutButton';

function ChooseBuilding() {
	let buildingNumParse = [
		'3 A',
		'3 B',
		'4 A',
		'4 B',
		'5',
		'6',
		'7',
		'8 A',
		'8 B',
		'9 A',
		'9 B',
		'10 A',
		'10 B',
		'11 A',
		'11 B',
		'13 A',
		'13 B',
		'15 A',
		'15 B',
		'17',
		'18 A',
		'18 B',
		'22 A',
		'22 B',
		'24 A',
		'24 B',
	];
	let buildingIdParse = [
		'FywVQflEbcDAiENcVLwL',
		'eosgkxWh12WnBtvMzZxm',
		'6lAiGRwXLUnxNqWqCQ4g',
		'bEv46Si5CWTq4axGuLqj',
		'IP2XMLWg11phJSGIj9pR',
		'1O5JxEvOGDmYDNLThJo5',
		'0wGxOfurp1eQKdKhsMb8',
		'6GsOpx87P9Vh9QznKf4C',
		't8aYFW1VCIGqQRI9ikoU',
		'rpgQUTQxVrZUX3hfalTs',
		'q3aPYpEBNXXCtlpkGY4Z',
		'mmsbrFImolkaWD5yRdOU',
		'rcrHOQ7F1Gpw1EhkogZ0',
		'HnQRbTSgI0CZE6G2gZ0F',
		'OIZkqHtNZ16tfaWZM6MV',
		'KHXNHL2S9IojgtXiYSQ2',
		'R9DYSVr8ZvBIn5dlg3XL',
		'VpHCTJDvfibhEhqGrR1S',
		'XTa3VtPIIZrel2BkjwTm',
		'NVbaDiBr5OHDopbJvFyu',
		'gTHLzIwWKWmumV7HmLXF',
		'Arc6RwBvSQ4OQlxVHlmY',
		'nISyUvI5lE2cl2HAnmrU',
		'PTKMLVurUWjnz1rVbriR',
		'bZkNKUcHseXQUfgKD0oc',
		'pRh9Y4Lxp0AVJy0yy6Wl',
	];
	let [options, optionName] = [[], ''];
	for (let i = 1; i <= 26; i++) {
		let option_Name = 'בניין ' + buildingNumParse[i - 1];
		let goTo = '/BuildingOperation/' + buildingIdParse[i - 1]+'/'+buildingNumParse[i - 1];
		// options[i] = <Option optionName={option_Name} imgAdd={buildingImg} />;
		options[i] = (
			<Link
				to={goTo}
				className='link'
				key={i}
				onClick={async () => {
					localStorage.setItem('chosen', buildingIdParse[i - 1]);
				}}>
				{' '}
				<Option optionName={option_Name} imgAdd={buildingImg} />
			</Link>
		);
	}
	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'>
				<HomePageButton />
			</Link>
			<Link to='/' className='link'>
				<LogoutButton />
			</Link>
			<h1>בחר בניין</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/ManagerHomePage' className='link link-button'>
				<BackButton />
			</Link>
		</div>
	);
}

export default ChooseBuilding;
