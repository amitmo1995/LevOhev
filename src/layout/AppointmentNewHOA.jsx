import React from 'react';

function AppointmentNewHOA() {
	return (
		<div className='wrapper'>
			<div className='formContainer'>
				<span className='formHeading'></span>
				<form action=''>
					{/* Input 1 */}
					<div className='input-group'>
						<i class='fa-brands fa-facebook'></i>
						<input type='text' placeholder='Username...' required />
						<span className='bar'></span>
					</div>
					{/* Input 2 */}
					<div className='input-group'>
						<i class='fa-brands fa-facebook'></i>
						<input type='text' placeholder='Username...' required />
						<span className='bar'></span>
					</div>
					{/* Input 3 */}
					<div className='input-group'>
						<i class='fa-brands fa-facebook'></i>
						<input type='text' placeholder='Username...' required />
						<span className='bar'></span>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AppointmentNewHOA;
