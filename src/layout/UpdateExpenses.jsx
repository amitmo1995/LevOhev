import React from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function UpdateExpenses() {
	return (
		<>
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'> הוצאה חדשה</span>
						{/* Input 1 */}
						<div className='input-group'>
							<i class='fa-regular fa-calendar-days'></i>
							<input type ="text" placeholder='תאריך' />
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
                            <i class="fa-regular fa-credit-card"></i>
                            <input type ='number' placeholder='סכום' min={1} required/>							<span className='bar'></span>
						</div>
						{/* Input 3 */}
						<div className='input-group'>
                            <i class="fa-regular fa-comment"></i>
							<input type ='text'   placeholder='הערות'  required/>
							<span className='bar'></span>
						</div>
						{/* Input 1 */}
						<div className='input-group'>
						<button>אישור</button>
						</div>
						<Link to='/HoaHomePage' className='link'>
							<BackButton />
						</Link>
				</div>
			</div>
		</>
	);
 }

export default UpdateExpenses;