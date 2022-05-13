import React, { useRef, useState } from 'react';

import {auth,useAuth, createUserWithEmailAndPassword} from '../firebase/firebase'



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
				<h1> ברוכים הבאים </h1>
				<input ref={emailRef}   placeholder='אימייל' text='הכנס אימייל' type='text'/>
				<input ref={passwordRef} placeholder='סיסמא' text='הכנס סיסמא' type='password'/>
				<button disabled={loding|| currentUser} onClick={handleSignup} >AddUser</button>
		</div>
	);
}

export default Signup;