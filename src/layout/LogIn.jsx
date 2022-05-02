import React from 'react';
import Heading from '../features/Heading';
import Input from '../features/Input';
import Button from '../features/Button';
import Building from '../features/Building';
import LeftSlide from '../features/LeftSlide';
import RightSlide from '../features/RightSlide';
import LogInButton from '../features/LogInButton';
import SelectTag from '../features/SelectTag';
import AccountBalance from '../features/AccountBalance';

function LogIn() {
	return (
		<div className='LogIn'>
				<Heading title='ברוכים הבאים' />
				<Input placeHolder='שם משתמש' text='הכנס שם משתמש' type='text' />
				<Input placeHolder='סיסמא' text='הכנס סיסמא' type='password' />
                <Button text='התחבר' link='ManagerHomePage' />
		</div>
	);
}

export default LogIn;
