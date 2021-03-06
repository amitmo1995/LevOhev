import React , { useEffect, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import HomePageButton from '../features/HomePageButton';


function DisplayMeeting() {
	const [attendance,setAttendance]=useState();
	const [summary,setSummary]=useState();
    const [date,setDate]=useState();
    const [topic,setTopic]=useState();
    useEffect(()=>{
        let meeting=JSON.parse(localStorage.getItem("meetingToDisplay"));
        setAttendance(meeting["attendance"]);
        setSummary(meeting["summary"]);
        setDate(meeting["date"].split('-').reverse().join('/'));
        setTopic(meeting["topic"]);
    },[])

	return (
		<>
	<div className='pageTemplate'>
	<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>

		<div>
			<h1 >:נושא פגישה</h1>
            <h1 >{topic}</h1>
            <h2 className='DisplaySummary'>תאריך: {date}</h2>
            <h2 className='DisplaySummary'>:בניינים שהשתתפו בפגישה</h2>
            <h2 className='DisplaySummary'>{attendance}</h2>
            <h2 className='DisplaySummary' >:סיכום</h2>
            <h3><pre>{summary}</pre></h3>
		</div>
		
		<Link to='/TrackMeeting' className='link'><BackButton /></Link>
	</div>
		</>
	);
}

export default DisplayMeeting;