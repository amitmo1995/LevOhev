import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function MeetingSummary() {
	//צריך למצוא פורמט מתאים
	return (
		<>
	<div className='pageTemplate'>
		<div className='Summary'>
			<h1>בחר תאריך פגישה</h1>
			<div className='input-group'>
				<input type ='date'/>
				<span className='bar'></span>
			</div>
		</div>
		<textarea readonly className="summarytext" rows="20" cols="100">asdadsd asd</textarea>
		<Link to='/MeetingManagement' className='link'><BackButton /></Link>
	</div>
		</>
	);
}

export default MeetingSummary;