import React from 'react';
import { Link } from 'react-router-dom';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import BackButton from '../features/BackButton';

function GivingScholarship() {
	return (
		<div className='pageTemplate'>
			<h1>הזן את סכום המלגה</h1>
            <div className='Scholarship'>
                        <div className='input-group'>
							<input type ='text' placeholder='סכום'/>
							<span className='bar'></span>
						</div>
                <button className='ok'><h2>אישור</h2></button>
            </div>
			<Link to='/FinancialManagement' className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default GivingScholarship;
