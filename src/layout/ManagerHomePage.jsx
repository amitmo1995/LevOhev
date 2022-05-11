import React from 'react';
import { useAuth } from '../firebase/firebase';
import Heading from '../features/Heading';
import Button from '../features/Button';
import Logout from '../features/Logout';  

function ManagerHomePage(props) {
    ///let userName='שלום ' + props.user ;
	const currentUser=useAuth();
	//console.log(currentUser["email"]);
	return (
		<div className='ManagerHomePage'>
				<Heading title= {currentUser?.email}/>
                <Button text='ניהול בניין' />
                <Button text='פגישות' />
                <Button text='חזור' />
				<Logout/>
		</div>
	);
}

export default ManagerHomePage;
