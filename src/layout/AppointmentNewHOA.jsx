import React, { useRef, useState } from 'react';
import {auth,useAuth, createUserWithEmailAndPassword,firestore} from '../firebase/firebase'
import BackButton from '../features/BackButton';
import {doc,setDoc,getDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';

function AppointmentNewHOA() {

	const emailRef=useRef();
	const buildingRef=useRef();
    const passwordRef=useRef();
	const permissionsRef=useRef();
    const [loding , setLoding] = useState(false);
    const currentUser=useAuth();

	async function handleAppointment() {
        setLoding(true);
        try{
            await createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value);
			const userRef=doc(firestore,'users',emailRef.current.value);
			setDoc(userRef,{building : buildingRef.current.value , password : passwordRef.current.value , permissions : permissionsRef.current.value});
        }catch{
            alert("error");
        }
        setLoding(false);
    }



	return (
		<>
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'>הוספת משתמש</span>
						{/* Input 1 */}
						<div className='input-group'>
							<i class='fa-solid fa-user'></i>
							<input ref={emailRef}   placeholder='אימייל' text='הכנס אימייל' type='text'/>
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
							<i class='fa-solid fa-lock'></i>
							<input ref={passwordRef} placeholder='סיסמא' text='הכנס סיסמא' type='password'/>
							<span className='bar'></span>
						</div>
						{/* Input 3 */}
						<div className='input-group'>
							<i class='fa-solid fa-building'></i>
							<input
								ref={buildingRef}
								type='number'
								placeholder=' מספר בניין'
								required
								max={18}
								min={1}
							/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
							<select ref={permissionsRef} className="permissions" id="permissions">
    							<option value="admin">admin</option>
    							<option value="HOA">HOA</option>
  							</select>
						</div>
						{/* Input 1 */}
						<div className='input-group'>
						<button disabled={loding|| currentUser} onClick={handleAppointment} >אישור</button>
						</div>
						<Link to='/ManagerHomePage' className='link'>
							<BackButton />
						</Link>
				</div>
			</div>
		</>
	);
}

export default AppointmentNewHOA;
