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
import { Outlet } from "react-router-dom";

function Home() {
	return ( 
		<div className='Home'>
			<div className='div1'></div>
			<div className='div2'>
				<div className="container">
				<Outlet /></div></div>
		</div>
	);
}
export default Home;
