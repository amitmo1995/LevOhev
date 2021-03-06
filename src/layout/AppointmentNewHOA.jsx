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
	deleteDoc,
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
			const qurySnapshot = await getDocs(q);
			qurySnapshot.forEach(doc => {
				buildingId = doc.id;
			});
			



		if(permissionsRef.current.value!="admin"){
			let id;
			let collectionRef=collection(firestore,'users');
			let HOAQuery= query(collectionRef,where("building_id","==",buildingId));
			let HOAQurySnapshot= await getDocs(HOAQuery);
			HOAQurySnapshot.forEach(doc=>{
				id=doc.id
			});
			if(id)
				await deleteDoc(doc(firestore,"users",id));
			await setDoc(userRef, {
				building_id: buildingId,
				permissions: permissionsRef.current.value,
				name: nameRef.current.value,
			});
			bool = true;
		}else{
			await setDoc(userRef, {
				permissions: permissionsRef.current.value,
				name: nameRef.current.value,
			});
			bool = true;
		}
		



			
		} catch {
			alert('???????????? ?????????? ?????? ?????? ????????');
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
					<span className='formHeading'>?????????? ??????????</span>
					{/* <form action=''> */}
					{/* Input 1 */}
					<div className='input-group'>
						<i class='fa-light fa-at'></i>
						<input
							ref={emailRef}
							placeholder='????????????'
							text='???????? ????????????'
							type='text'
						/>
						<span className='bar'></span>
					</div>
					<div className='input-group'>
						<i class='fa-solid fa-user'></i>
						<input ref={nameRef} placeholder='????' text='????' type='text' />
						<span className='bar'></span>
					</div>
					{/* Input 2 */}
					<div className='input-group'>
						<i class='fa-solid fa-lock'></i>
						<input
							ref={passwordRef}
							placeholder='??????????'
							text='???????? ??????????'
							type='password'
						/>
						<span className='bar'></span>
					</div>
					{/* Input 3 */}
					<div className='input-group'>
						<i class='fa-solid fa-building'></i>
						<label for='building'>
							{' '}
							<b>??????????</b>{' '}
						</label>
						<select ref={buildingRef} className='building' id='building'>
							<option value='3A'>3??</option>
							<option value='3B'>3??</option>
							<option value='4A'>4??</option>
							<option value='4B'>4??</option>
							<option value='5'>5</option>
							<option value='6'>6</option>
							<option value='7'>7</option>
							<option value='8A'>8??</option>
							<option value='8B'>8??</option>
							<option value='9A'>9??</option>
							<option value='9B'>9??</option>
							<option value='10A'>10??</option>
							<option value='10B'>10??</option>
							<option value='11A'>11??</option>
							<option value='11B'>11??</option>
							<option value='13A'>13??</option>
							<option value='13B'>13??</option>
							<option value='15A'>15??</option>
							<option value='15B'>15??</option>
							<option value='17'>17</option>
							<option value='18A'>18??</option>
							<option value='18B'>18??</option>
							<option value='22A'>22??</option>
							<option value='22B'>22??</option>
							<option value='24A'>24??</option>
							<option value='24B'>24??</option>
						</select>
					</div>

					<div className='input-group'>
						<i class='fa-solid fa-user'></i>
						<select
							ref={permissionsRef}
							className='permissions'
							id='permissions'>
							<option value='admin'>????????</option>
							<option value='HOA'>???????? ???????? ??????</option>
						</select>
					</div>
					{/* Input 1 */}
					<div className='input-group'>
						<button disabled={loding} onClick={handleAppointment}>
							??????????
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default AppointmentNewHOA;
