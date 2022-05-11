import React from 'react';
import LoginButton from './LoginButton';

function Login() {
	return (
		<div class='login-container'>
			<div class='login-box'>
				<div class='left'></div>
				<div class='right'>
					<h1>ברוכים הבאים</h1>
					<br />
					<input type='text' class='field' placeholder='שם משתמש' />
					<input type='password' class='field' placeholder='סיסמא' />
					<LoginButton />
				</div>
			</div>
		</div>
	);
}

export default Login;
