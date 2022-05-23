import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function AddNeighbors() {
	return (
		<>
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'>הוספת דייר</span>
						<div className='input-group'>
                        <i class="fa-solid fa-people-roof"></i>
							<input  placeholder='שם משפחה' type='text'/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
                        <i class="fa-solid fa-house"></i>							<input
								type='number'
								placeholder=' מספר בית'
								required
								min={1}
							/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-children"></i>
							<input
								type='number'
								placeholder='מספר נפשות מתחת לגיל 18'
								required
								min={1}
							/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-users"></i>
							<input
								type='number'
								placeholder='מספר נפשות מעל גיל 18'
								required
								min={1}
							/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-file-medical"></i>
							<input
								type='number'
								placeholder='מספר נפשות עם בעיות רפואיות (אם קיים..)'
								required
								min={1}
							/>
							<span className='bar'></span>
						</div>
                        
						<div className='input-group'>
						<button>אישור</button>
						</div>
                        <Link to='/BuildingOperation' className='link'>
							<BackButton />
						</Link>
				</div>
			</div>

		</>
	);
}
export default AddNeighbors;
