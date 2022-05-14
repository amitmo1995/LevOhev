import React from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function AddNewPayment() {
	return (
		<>
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'>הוספת תשלום </span>
						{/* Input 1 */}
						<div className='input-group'>
							<i class='fa-solid fa-building'></i>
							<input type ="number"   placeholder='מספר דירה ' max="18" min="1" />
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
                            <i class="fa-regular fa-calendar-days"></i>
                            <input type ='month'   placeholder='חודש ' required/>							<span className='bar'></span>
						</div>
						{/* Input 3 */}
						<div className='input-group'>
                            <i class="fa-regular fa-credit-card"></i>
							<input type ='number'   placeholder='סכום' min='1' required/>
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

export default AddNewPayment;