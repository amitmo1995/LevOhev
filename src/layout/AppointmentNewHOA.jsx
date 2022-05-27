import React, { useRef, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	firestore,
} from '../firebase/firebase';
//import BackButton from '../features/BackButton';
import {
	doc,
	setDoc,
	getDocs,
	collection,
	where,
	getDoc,
	query,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import HomePageButton from '../features/HomePageButton';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../features/LogoutButton';

function AppointmentNewHOA() {
	const emailRef = useRef();
	const buildingRef = useRef();
	const nameRef = useRef();
	const passwordRef = useRef();
	const permissionsRef = useRef();
	const [loding, setLoding] = useState(false);
	const navigate = useNavigate();

	async function handleAppointment() {
		const auth = getAuth();
		const adminUser = auth.currentUser;
		let bool = false;

		// Register code ...
		try {
			await createUserWithEmailAndPassword(
				auth,
				emailRef.current.value,
				passwordRef.current.value
			);
			const userRef = doc(firestore, 'users', emailRef.current.value);
			//get the building id by chosen building
			let buildingId = '';
			console.log('in bulding');
			const buildingPointer = collection(firestore, 'building');
			const q = query(
				buildingPointer,
				where(
					'building_num',
					'==',
					buildingRef.current.value.replace(/[^0-9]/g, '')
				),
				where(
					'entrance',
					'==',
					buildingRef.current.value.replace(/[^A-Za-z]/g, '')
				)
			);
			alert(
				buildingRef.current.value.replace(/[^0-9]/g, '') +
					' ' +
					buildingRef.current.value.replace(/[^A-Za-z]/g, '')
			);
			const qurySnapshot = await getDocs(q);
			qurySnapshot.forEach(doc => {
				console.log('in bulding');
				console.log(doc.id, '===>', doc.data());
				buildingId = doc.id;
			});

			await setDoc(userRef, {
				building_id: buildingId,
				permissions: permissionsRef.current.value,
				name: nameRef.current.value,
			});
			bool = true;
		} catch {
			alert('error');
		}

		auth.updateCurrentUser(adminUser);
		if (bool) {
			navigate(-1);
		}
	}

	return (
		<>
			<div className='wrapper'>
				<Link to='/ManagerHomePage' className='link'>
					<HomePageButton />
				</Link>
				<Link to='/' className='link'>
					<LogoutButton />
				</Link>
				<div className='formContainer'>
					<span className='formHeading'>הוספת משתמש</span>
					{/* <form action=''> */}
					{/* Input 1 */}
					<div className='input-group'>
						<i class='fa-light fa-at'></i>
						<input
							ref={emailRef}
							placeholder='אימייל'
							text='הכנס אימייל'
							type='text'
						/>
						<span className='bar'></span>
					</div>
					<div className='input-group'>
						<i class='fa-solid fa-user'></i>
						<input ref={nameRef} placeholder='שם' text='שם' type='text' />
						<span className='bar'></span>
					</div>
					{/* Input 2 */}
					<div className='input-group'>
						<i class='fa-solid fa-lock'></i>
						<input
							ref={passwordRef}
							placeholder='סיסמא'
							text='הכנס סיסמא'
							type='password'
						/>
						<span className='bar'></span>
					</div>
					{/* Input 3 */}
					<div className='input-group'>
						<i class='fa-solid fa-building'></i>
						<label for='building'>
							{' '}
							<b>בניין</b>{' '}
						</label>
						<select ref={buildingRef} className='building' id='building'>
							<option value='3A'>3א</option>
							<option value='3B'>3ב</option>
							<option value='4A'>4א</option>
							<option value='4B'>4ב</option>
							<option value='5'>5</option>
							<option value='6'>6</option>
							<option value='7'>7</option>
							<option value='8A'>8א</option>
							<option value='8B'>8ב</option>
							<option value='9A'>9א</option>
							<option value='9B'>9ב</option>
							<option value='10A'>10א</option>
							<option value='10B'>10ב</option>
							<option value='11A'>11א</option>
							<option value='11B'>11ב</option>
							<option value='13A'>13א</option>
							<option value='13B'>13ב</option>
							<option value='15A'>15א</option>
							<option value='15B'>15ב</option>
							<option value='17'>17</option>
							<option value='18A'>18א</option>
							<option value='18B'>18ב</option>
							<option value='22A'>22א</option>
							<option value='22B'>22ב</option>
							<option value='24A'>24א</option>
							<option value='24B'>24ב</option>
						</select>
					</div>

					<div className='input-group'>
						<i class='fa-solid fa-user'></i>
						<select
							ref={permissionsRef}
							className='permissions'
							id='permissions'>
							<option value='admin'>מנהל</option>
							<option value='HOA'>יו״ר וועד בית</option>
						</select>
					</div>
					{/* Input 1 */}
					<div className='input-group'>
						<button disabled={loding} onClick={handleAppointment}>
							אישור
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default AppointmentNewHOA;
