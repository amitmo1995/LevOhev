import React, { useEffect, useState , useRef } from 'react';
import emailjs from 'emailjs-com';
import BackButton from '../features/BackButton';
import { Link , useNavigate } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import HomePageButton from '../features/HomePageButton';
import { LogoutButton } from '../features/LogoutButton';

let sortByDate = function (date_1, date_2) {
	date_1 = date_1.split('-');
	date_2 = date_2.split('-');
	//compare year
	date_1[0] = parseInt(date_1[0]);
	date_2[0] = parseInt(date_2[0]);
	if (date_1[0] > date_2[0]) {
		return 1;
	} else if (date_2[0] > date_1[0]) {
		return -1;
	}
	//compare mounth
	date_1[1] = parseInt(date_1[1]);
	date_2[1] = parseInt(date_2[1]);
	if (date_1[1] > date_2[1]) {
		return 1;
	} else if (date_2[1] > date_1[1]) {
		return -1;
	}
	//compare day
	date_1[2] = parseInt(date_1[2]);
	date_2[2] = parseInt(date_2[2]);
	if (date_1[2] > date_2[2]) {
		return 1;
	} else if (date_2[2] > date_1[2]) {
		return -1;
	}
	return 0;
};



function TrackMeeting() {
	const navigate = useNavigate();
	const [loding, setLoding] = useState(true);
	const [children, setChildren] = useState(<div></div>);

	const emailRef = useRef("");
	const topicRef = useRef();
	const dateRef = useRef();
	const summaryRef = useRef();
	const attendanceRef = useRef();
    const form = useRef();




	const sendEmail = async (meeting) => {
		let tempEmail="";
		try{
		  
				const buildingRef= collection(firestore,'users');
				const q= query(buildingRef);
				const qurySnapshot= await getDocs(q);
				qurySnapshot.forEach(doc=>{
					tempEmail+=","+doc.id;
				});
			}catch{
				console.log("error");
			}
		tempEmail=tempEmail.substring(1);
		
		
		///delete before production
		tempEmail="";
	
		emailRef.current.value=tempEmail;
		dateRef.current.value=meeting.date;
		topicRef.current.value=meeting.topic;
		summaryRef.current.value=meeting.summary;
		attendanceRef.current.value=meeting.attendance;
	
		console.log(meeting);
		
		emailjs.sendForm('service_f0pei3a', 'template_yvlfcxp', form.current, '9rAST6Xc6VoGnwDQa')
		  .then((result) => {
			  console.log(result.text);
			  alert("המייל נשלח בהצלחה");
		  }, (error) => {
			  console.log(error.text);
			  alert("שליחת המייל נכשלה");
		  });
	
		
	  };

	let meetingSummary = {};
	let keys = '';
	

	async function getData() {
		try {
			let collectionRef = collection(firestore, 'meeting_summary');
			let Query = query(collectionRef);
			let snapshot = await getDocs(Query);
			snapshot.forEach(doc => {
				meetingSummary[doc.id] = doc.data();
			});
			keys = Object.keys(meetingSummary);
			keys.sort((key1, key2) => {
				return sortByDate(
					meetingSummary[key1]['date'],
					meetingSummary[key2]['date']
				);
			});
			keys.reverse();
			let temp = keys.map(key => {
				return (
					<tr>
						<td><button id={key} onClick={()=>{sendEmail(meetingSummary[key])}}>שלח סיכום פגישה במייל</button></td>
						<td>{meetingSummary[key]['attendance']}</td>
						<td>{meetingSummary[key]['summary']}</td>
						<td>{meetingSummary[key]['topic']}</td>
						<td>
							{meetingSummary[key]['date'].split('-').reverse().join('-')}
						</td>
					</tr>
				);
			});
			setChildren(temp);
			setLoding(false);
		} catch {
			console.log('queryError');
		}
	}
	useEffect(() => {
		getData();
	}, []);
	//useEffect(()=>{},[children])

	if (loding) {
		return <h1>loding ... </h1>;
	}

	return (
		<>
			<div className='tableData'>
				<Link to='/ManagerHomePage' className='link'>
					<HomePageButton />
				</Link>
				<Link to='/' className='link'>
					<LogoutButton />
				</Link>
				<h1>מעקב נוכחים</h1>
				<table>
					<thead>
						<tr>
						    <th>שלח במייל</th>
							<th>נוכחים</th>
							<th>סיכום</th>
							<th>נושא</th>
							<th>תאריך</th>
						</tr>
					</thead>
					<tbody>{children}</tbody>
				</table>
				<Link to='/MeetingManagement' className='link'>
					<BackButton />
				</Link>
				<form  hidden id='form1' ref={form} onSubmit={sendEmail}>
      <input ref={topicRef} type="text" name="topic" />
      <input ref={emailRef} id="email" type="email" name="email" />
      <input ref={dateRef} type="text" name="date" />
      <input ref={summaryRef} id="email" type="text" name="summary" />
      <input ref={attendanceRef} id="email" type="text" name="attendance" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
			</div>
		</>
	);
}

export default TrackMeeting;
