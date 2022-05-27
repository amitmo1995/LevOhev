import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import { addDoc, collection} from 'firebase/firestore';
import HomePageButton from '../features/HomePageButton';


function MeetingSummary() {
	
	const dateRef=useRef();
	const summaryRef=useRef();

	async function handleSubmit(){
		try{
			await addDoc(collection(firestore,'meeting_summary'),{date :  dateRef.current.value , summary : summaryRef.current.value });			
		}catch{
			alert("error");
		}
	}
	
	
	
	return (
		<>
	<div className='pageTemplate'>
	<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>

		<div className='Summary'>
			<h1>בחר תאריך פגישה</h1>
			<div className='input-group'>
				<input ref={dateRef} type ='date'/>
				<span className='bar'></span>
			</div>
		</div>
		<textarea ref={summaryRef} readonly className="summarytext" rows="20" cols="100">סיכום</textarea>
		<button onClick={handleSubmit}>הגש</button>
		<Link to='/MeetingManagement' className='link'><BackButton /></Link>
	</div>
		</>
	);
}

export default MeetingSummary;