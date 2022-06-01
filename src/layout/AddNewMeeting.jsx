import React, { useRef } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import HomePageButton from '../features/HomePageButton';
import { addDoc, collection ,query,where,getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../features/LogoutButton';

function AddNewMeeting() {
	const dateRef = useRef();
	const topicRef = useRef();
	const summaryRef = useRef();
	const navigate = useNavigate();

	async function handleSubmit() {
		let meetingExistId=false;
		//check if the meeting already exist
		try{
			const meetingRef= collection(firestore,'meeting_summary');
			const q= query(meetingRef,where("date","==",dateRef.current.value));
			const qurySnapshot= await getDocs(q);
			qurySnapshot.forEach(doc=>{
				console.log("in meetingExistId");
				meetingExistId=true;
			});
		}catch(e){
			console.log(e,"  error on meetingExistId");
		}

		if(dateRef.current.value==""){
			alert("אנא בחר/י תאריך, זהו שדה חובה")
		}
		else if(meetingExistId){
			alert("קיימת פגישה בתאריך זה, אנא בחר/י תאריך אחר");
		}
		else{
			let checkboxes = document.getElementsByName('buildingChecker');
			let attendance = '';
			for (var i = 0, n = checkboxes.length; i < n; i++) {
				if (checkboxes[i].checked) attendance += checkboxes[i].value + ' , ';
			}
	
			try {
				await addDoc(collection(firestore, 'meeting_summary'), {
					date: dateRef.current.value,
					topic: topicRef.current.value,
					summary: summaryRef.current.value,
					attendance: attendance,
				});
			} catch {
				alert('error');
			} finally {
				navigate(-1);
			}
		}
	}

	return (
		<>
			<div className='addNewMeeting'>
				<div className='wrapper'>
					<Link to='/ManagerHomePage' className='link'>
						<HomePageButton />
					</Link>
					<Link to='/' className='link'>
						<LogoutButton />
					</Link>
					<div className='formContainer'>
						<span className='formHeading'>הוספת פגישה </span>
						<div className='input-group'>
							<i class='fa-regular fa-calendar-days'></i>
							<input ref={dateRef} type='date' placeholder='תאריך' required />
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
							<i class='fa-solid fa-square-plus'></i>
							<input ref={topicRef} type='Topic' placeholder='נושא' />
							<span className='bar'></span>
						</div>
						<div className='input-building'>
							<h4>סימון נוכחות </h4>
							<table>
								<tr>
									<th>
										<h5> בניין 3א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='3A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 3ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='3B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 4א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='4A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 4ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='4B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 5</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='5'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 6</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='6'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
								</tr>
								<tr>
									<th>
										<h5> בניין 7</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='7'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 8א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='8A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 8ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='8B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 9א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='9A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 9ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='9B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 10א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='10A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
								</tr>
								<tr>
									<th>
										<h5> בניין 10ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='10B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 11א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='11A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 11ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='11B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 13א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='13A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 13ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='13B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 15א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='15A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
								</tr>
								<tr>
									<th>
										<h5> בניין 15ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='15B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 17</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='17'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 18א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='18A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 18ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='18B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 22א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='22A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 22ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='22B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
								</tr>
								<tr>
									<th>
										<h5> בניין 24א</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='24A'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
									<th>
										<h5>בניין 24ב</h5>
									</th>
									<th>
										<input
											type='checkbox'
											name='buildingChecker'
											value='24B'></input>{' '}
										<label for='buildingChecker'></label>
									</th>
								</tr>
							</table>
						</div>
						<div className='summary'>
							<h4>סיכום</h4>
							<textarea ref={summaryRef} rows='7' cols='40'></textarea>
						</div>

						<div className='input-group'>
							<button onClick={handleSubmit}>אישור</button>
						</div>
						<Link to='/MeetingManagement' className='link'>
							<BackButton />
						</Link>
						{/* </form> */}
					</div>
				</div>
			</div>
		</>
	);
}
export default AddNewMeeting;
