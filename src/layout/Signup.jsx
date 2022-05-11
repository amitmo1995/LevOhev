import React, { useRef, useState } from 'react';

import {auth,useAuth, createUserWithEmailAndPassword} from '../firebase/firebase'

import Heading from '../features/Heading';
import Button from '../features/Button';



function Signup() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const [loding , setLoding] = useState(false);
    const currentUser=useAuth();

    
    async function handleSignup() {
        setLoding(true);
        try{
            await createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value);
        }catch{
            alert("error");
        }
        setLoding(false);
    }
    

	return (
		<div className='Signup'>
            <div>משתמש מחובר  {currentUser?.email}-</div>
				<Heading title='ברוכים הבאים' />
				<input ref={emailRef}   placeholder='אימייל' text='הכנס אימייל' type='text'/>
				<input ref={passwordRef} placeholder='סיסמא' text='הכנס סיסמא' type='password'/>
				<Button disabled={loding|| currentUser} onClick={handleSignup} text={"הרשם"}/>
		</div>
	);
}

export default Signup;
