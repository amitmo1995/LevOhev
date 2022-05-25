import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where,doc,setDoc,getDoc, addDoc,add, collection,onSnapshot, query, getDocs} from 'firebase/firestore';

function AddNewPayment() {
	const dateRef=useRef();
	const apartmentRef=useRef();
	const amountRef=useRef();

	async function handleSubmit(){


		//query to get the apartment id
		let apartmentId="";
		const buildingId=JSON.parse(localStorage.getItem('userConnected')).data.building;
		try{
			const collectionRef=collection(firestore,'apartment');
			const apartQuery= query(collectionRef,where("building","==",buildingId),where("aprt_num","==",apartmentRef.current.value));
			const apartQurySnapshot= await getDocs(apartQuery);
			apartQurySnapshot.forEach(doc=>{
				apartmentId=doc.id;
			});
		}catch{
			console.log("error on apartment id Query");
		}

		try{
			await addDoc(collection(firestore,'monthly_payment'),{date :  dateRef.current.value , building : buildingId , apartment : apartmentId ,apartment_num : apartmentRef.current.value, amount : amountRef.current.value});			
		}catch{
			alert("error");
		}
	}

	// async function handleSubmit(){
	// try{
	// 	const Ref=await collection(firestore,'monthly_payment');
	// 	const q=await query(Ref,where("building","==","1"));
	// 	await (await getDocs(q)).forEach(onSnap=>{
	// 		console.log(onSnap.get('amount'));
	// 	});
	// }catch{
	// 	console.log("error");
	// }	

	// try{
	// 	const Ref=await collection(firestore,'building');
	// 	const q=await query(Ref,where("building_num","==","1","&&","entrance","==","A"));
	// 	await (await getDocs(q)).forEach(onSnap=>{
	// 		const b=onSnap.get('balance')+int(amountRef.current.value);
	// 		console.log(b);
	// 		onSnap.set();
	// 	});
	// }catch{
	// 	console.log("error");
	// }	



	// onSnapshot(collection(firestore,'monthly_payment'),(snapshot)=>{
	// 	var usersArr=snapshot.docs.map(doc=>{return {id : doc.id , data : doc.data()}});
	// 	let ind=-1;
	// 	for(let i=0;i<usersArr.length;i++){
	// 		if(usersArr[i].id==userEmail){
	// 			ind=i;
	// 			break;
	// 		}
	// 	}
	// 	localStorage.setItem("userConnected",JSON.stringify(usersArr[ind]));
	// 	if(usersArr[ind].data.permissions=="admin"){
	// 		navigate("../ManagerHomePage");
	// 	}
	// 	else{
	// 		navigate("../HoaHomePage");
	// 	}
	// });








	//}





	return (
		<>
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'>הוספת תשלום </span>
					{/* <form action=''> */}
						{/* Input 1 */}
						<div className='input-group'>
							<i class='fa-solid fa-building'></i>
							<input ref={apartmentRef} type ="number"   placeholder='מספר דירה ' max="18" min="1" />
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
                            <i class="fa-regular fa-calendar-days"></i>
                            <input ref={dateRef} type ='date'   placeholder='תאריך' required/>							<span className='bar'></span>
						</div>
						{/* Input 3 */}
						<div className='input-group'>
                            <i class="fa-regular fa-credit-card"></i>
							<input ref={amountRef} type ='number'   placeholder='סכום' min='1' required/>
							<span className='bar'></span>
						</div>
						{/* Input 1 */}
						<div className='input-group'>
						<button onClick={handleSubmit}>אישור</button>
						</div>
						<Link to='/HoaHomePage' className='link'>
							<BackButton />
						</Link>
						{/* </form> */}
				</div>
			</div>
		</>
	);
 }

export default AddNewPayment;








/*
// const apartQurySnapshot= await getDocs(apartQuery);
// const apartQuery= query(collectionRef,where("building_id","==",buildingId),where("aprt_num","==",apartmentRef));
let apartmentId="";
// const buildingId=JSON.parse(localStorage.getItem('userConnected')).data.building;
const amountRef=useRef();



async function handleSubmit(){


	//query to get the apartment id
	try{
		console.log("on apartment id Query 0");
		// const collectionRef=collection(firestore,'apartment');
		console.log("on apartment id Query 0");
		console.log("on apartment id Query 1");
		console.log("on apartment id Query 2");
		apartQurySnapshot.forEach(doc=>{
			apartmentId=doc.id
		});
	}catch{
		console.log("error on apartment id Query");
	}
	

	try{
		
		await addDoc(collection(firestore,'monthly_payment'),{date :  dateRef.current.value , building : buildingId , apartment : apartmentId , amount : amountRef.current.value});			
	}catch{
		alert("error");
	}
}
*/