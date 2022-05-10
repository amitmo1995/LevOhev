import React from 'react';
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
