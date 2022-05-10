import React , { useState }from 'react';

import {auth, signOut, useAuth} from '../firebase/firebase'



export function Logout(props) {

	const [loding , setLoding] = useState(false);
	const currentUser=useAuth();
	
	async function handleLogout(){
		setLoding(true);
		try{
			await signOut(auth);
		}catch{
			alert("Error");
		}
		setLoding(false);
		
	}

	return (
		<div>
			<button disabled={loding || !currentUser } onClick={handleLogout}>התנתק</button>
		</div>
	);
}

export default Logout;