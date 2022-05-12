import React from 'react';
import BackButton from '../features/BackButton';

function AppointmentNewHOA() {
	return (
		<>
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'>מינוי יו"ר ועד בית</span>
					<form action=''>
						{/* Input 1 */}
						<div className='input-group'>
							<i class='fa-solid fa-user'></i>
							<input type='text' placeholder=' שם משתמש' required />
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
							<i class='fa-solid fa-lock'></i>
							<input type='password' placeholder=' סיסמא' required />
							<span className='bar'></span>
						</div>
						{/* Input 3 */}
						<div className='input-group'>
							<i class='fa-solid fa-building'></i>
							<input
								type='number'
								placeholder=' מספר בניין'
								required
								max={18}
								min={1}
							/>
							<span className='bar'></span>
						</div>
						{/* Input 1 */}
						<div className='input-group'>
							<button>
								אישור
								{/* <i class="fa-solid fa-paper-plane-top"></i>	 */}
							</button>
						</div>
					</form>
				</div>
			</div>
			<BackButton />
		</>
	);
}

export default AppointmentNewHOA;
