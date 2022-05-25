import React, { useRef, useState } from 'react';
import {auth,useAuth, createUserWithEmailAndPassword,firestore} from '../firebase/firebase'
import BackButton from '../features/BackButton';
import { doc , setDoc , getDocs , collection , where ,getDoc , query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import HomePageButton from '../features/HomePageButton';


function AppointmentNewHOA() {

	const emailRef=useRef();
	const buildingRef=useRef();
	const nameRef=useRef();
    const passwordRef=useRef();
	const permissionsRef=useRef();
	const entranceRef=useRef("");
    const [loding , setLoding] = useState(false);
    const currentUser=getAuth();

	async function handleAppointment() {

		const auth = getAuth();
		const adminUser = auth.currentUser


		// Register code ...
		try{
			await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
			const userRef=doc(firestore,'users',emailRef.current.value);
			//set the entrance
			let entrance="";
		    if(entranceRef.current.value=="א")
		        entrance="A";
		    else if(entranceRef.current.value=="ב")
		        entrance="B";
            //get the building id by entrance and building number
			let buildingId="";
			console.log("in bulding");
			const buildingPointer= collection(firestore,'building');
			const q= query(buildingPointer,where("building_num","==",buildingRef.current.value),where("entrance","==",entrance));
			const qurySnapshot= await getDocs(q);
			qurySnapshot.forEach(doc=>{
				console.log("in bulding");
				console.log(doc.id,"===>",doc.data());
				buildingId=doc.id
			});
			

		 	await setDoc(userRef,{building_id:buildingId , permissions : permissionsRef.current.value , name : nameRef.current.value});
		}catch{
			alert("error");
		}
		
		auth.updateCurrentUser(adminUser)

	}

	

// 	async function handleAppointment() {
// 		alert("ya malshin");
// 		getAuth()
//   .createUser({
//     email: 'user@example.com',
//     emailVerified: false,
//     phoneNumber: '+11234567890',
//     password: 'secretPassword',
//     displayName: 'John Doe',
//     photoURL: 'http://www.example.com/12345678/photo.png',
//     disabled: false,
//   })
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log('Successfully created new user:', userRecord.uid);
//   })
//   .catch((error) => {
//     console.log('Error creating new user:', error);
//   });


	  



// 		// const auth = getAuth();
// 		// signOut(auth).then(() => {
// 		//   // Sign-out successful.
// 		//   console.log("loged out");
// 		// }).catch((error) => {
// 		//   // An error happened.
// 		// });





//         // setLoding(true);
//         // try{
//         //     await createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value);
// 		// 	const userRef=doc(firestore,'users',emailRef.current.value);
// 		// 	setDoc(userRef,{building : buildingRef.current.value , password : passwordRef.current.value , permissions : permissionsRef.current.value});
//         // }catch{
//         //     alert("error");
//         // }
//         // setLoding(false);
//     }



	return (
		<>
			<div className='wrapper'>
				<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
				<div className='formContainer'>
					<span className='formHeading'>הוספת משתמש</span>
					{/* <form action=''> */}
						{/* Input 1 */}
						<div className='input-group'>
							<i class="fa-light fa-at"></i>
							<input ref={emailRef}   placeholder='אימייל' text='הכנס אימייל' type='text'/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
						<i class='fa-solid fa-user'></i>
							<input ref={nameRef}   placeholder='שם' text='שם' type='text'/>
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

						{/* Input 4 */}
						<div className='input-group'>
							<i class='fa-solid fa-building'></i>
							<input
								ref={entranceRef}
								type='text'
								placeholder=' כניסה, אם יש אז- א \ ב'
							/>
							<span className='bar'></span>
						</div>





						<div className='input-group'>
						<i class='fa-solid fa-user'></i>
							<select ref={permissionsRef} className="permissions" id="permissions" >
    							<option value="admin">מנהל</option>
    							<option value="HOA">יו״ר וועד בית</option>
  							</select>
						</div>
						{/* Input 1 */}
						<div className='input-group'>
						<button disabled={loding} onClick={handleAppointment} >אישור</button>
						</div>
				</div>
			</div>
		</>
	);
}

export default AppointmentNewHOA;
