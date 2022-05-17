import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function MeetingSummary() {
	//צריך למצוא פורמט מתאים
	return (
		<>
						<Link to='/MeetingManagement' className='link'>
							<BackButton />
						</Link>
						{/* </form> */}
			
		</>
	);
}

export default MeetingSummary;
