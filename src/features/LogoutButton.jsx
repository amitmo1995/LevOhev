import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut, useAuth } from '../firebase/firebase';

export function LogoutButton(props) {
	const [loding, setLoding] = useState(false);
	const currentUser = useAuth();
	let navigate = useNavigate();
	let userLoggedOut = false;
	async function handleLogout() {
		setLoding(true);
		try {
			await signOut(auth);
			userLoggedOut = true;
		} catch {
			alert('Error');
			userLoggedOut = false;
		}
		setLoding(false);

		if (userLoggedOut) {
			localStorage.clear();
			navigate('/');
		}
	}

	return (
		<div className='logOutButton'>
			<button disabled={loding || !currentUser} onClick={handleLogout}>
				<i class='fa-solid fa-arrow-right-from-bracket fa-2x'></i>{' '}
			</button>
		</div>
	);
}
