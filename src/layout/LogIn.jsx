import React, { useRef, useState } from 'react';

import {auth,useAuth,signInWithEmailAndPassword} from '../firebase/firebase'
import Heading from '../features/Heading';
import Button from '../features/Button';
import Logout from '../features/Logout';




function LogIn() {

	const emailRef=useRef();
    const passwordRef=useRef();
    const [loding , setLoding] = useState(false);
    const currentUser=useAuth();

	async function handleLogin() {
        setLoding(true);
        try{
            await signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value);
        }catch{
            alert("error");
        }
        setLoding(false);
    }

	return (
		<div className='LogIn'>
			<Heading title='ברוכים הבאים' />
			<div className='Input'>
			    <h3> הכנס אימייל</h3>
			    <input ref={emailRef} type='text' placeholder='אימייל' />
		    </div>
			<div className='Input'>
			    <h3> הכנס סיסמא</h3>
			    <input ref={passwordRef} type='password' placeholder='סיסמא' />
		    </div>
			<Button disabled={loding|| currentUser} onClick={handleLogin} text={"התחבר"}/>
			<Logout/>
		</div>
	);
}

export default LogIn;


/*
	return (
		<div className='LogIn'>
			<Heading title='ברוכים הבאים' />
				<input ref={emailRef}   placeholder='אימייל' text='הכנס אימייל' type='text'/>
				<input ref={passwordRef} placeholder='סיסמא' text='הכנס סיסמא' type='password'/>
				<Button disabled={loding|| currentUser} onClick={handleLogin} text={"הרשם"}/>
		</div>
	);
*/