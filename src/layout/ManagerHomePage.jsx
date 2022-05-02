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

function ManagerHomePage(props) {
    let userName='שלום ' + props.user ;
	return (
		<div className='ManagerHomePage'>
				<Heading title= {userName}/>
                <Button text='ניהול בניין' />
                <Button text='פגישות' />
                <Button text='חזור' />
		</div>
	);
}

export default ManagerHomePage;
