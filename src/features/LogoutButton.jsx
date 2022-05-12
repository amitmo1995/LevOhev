import React , { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import {auth, signOut, useAuth} from '../firebase/firebase'



export function LogoutButton(props) {

	const [loding , setLoding] = useState(false);
	const currentUser=useAuth();
	let navigate=useNavigate();
	let userLoggedOut=false;
	async function handleLogout(){
		setLoding(true);
		try{
			await signOut(auth);
			userLoggedOut=true;
		}catch{
			alert("Error");
			userLoggedOut=false;
		}
		setLoding(false);

		if(userLoggedOut) navigate('/');
		
	}

	return (
		<div>
			<button disabled={loding || !currentUser } onClick={handleLogout}>התנתק</button>
		</div>
	);
}
