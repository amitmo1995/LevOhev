import React from 'react';
import Heading from '../features/Heading';
import Input from '../features/Input';
import Button from '../features/Button';
import Building from '../features/Building';
import LeftSlide from '../features/LeftSlide';
import RightSlide from '../features/RightSlide';

function Home() {
	return (
		<div className='Home'>
			<div className='div1'></div>
			<div className='div2'>
				<Heading title='ברוכים הבאים' />
				<Input placeHolder='שם משתמש' text='הכנס שם משתמש' type='text' />
				<Input placeHolder='סיסמא' text='הכנס סיסמא' type='password' />
				<Button text='התחבר' />
				<Building BuildingNumber ='1' numOfAdults='25' numOfDisables='15' numOfKids='-12'/>
				<LeftSlide/>
				<RightSlide/>
				
			</div>
		</div>
	);
}

export default Home;
