import React from 'react';
import Heading from '../features/Heading';
import Button from '../features/Button';

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
