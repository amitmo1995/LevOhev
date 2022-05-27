/*
import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link, useParams } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where,doc,setDoc,getDoc, addDoc,add, collection,onSnapshot, query, getDocs} from 'firebase/firestore';

function Query() {
	const dateRef=useRef();
	const apartmentRef=useRef();
	const amountRef=useRef();

	const params= useParams();
	console.log(params);
/*
	async function handleSubmit(){
		try{
			const building=JSON.parse(localStorage.getItem('userConnected')).data.building;
			await addDoc(collection(firestore,'monthly_payment'),{date :  dateRef.current.value , building : building , apartment : apartmentRef.current.value , amount : amountRef.current.value});			
		}catch{
			alert("error");
		}
	}
*/


	 //async function handleSubmit(){

		
		//query to get document by id 
		//get connected_user doc
		// try{
		// 	const docId="amit@gmail.com";
		// 	const docRef = doc(firestore,'users',docId);
		// 	const docSnap =await getDoc(docRef);
		// 	if(docSnap.exists()){
		// 		console.log(docSnap.data());
		// 	}else{
		// 		console.log("no such document!");
		// 	}
		// }catch{
		// 	console.log("error");
		// }




		/*
        //add new apartment classification
		//-----------------------------------------------------need to fix---------------------------------------------------------
		//-----------------------------------------note that every aptdate create new document-------------------------------  
        //get the building id
		let buildingId;
		//get the building number from the local storage
		const buildingNum = JSON.parse(localStorage.getItem('userConnected')).data.building;
		console.log("buildingNum = ",buildingNum);
		const entrance="A";
		try{
			const buildingRef= collection(firestore,'building');
			const q= query(buildingRef,where("building_num","==",buildingNum),where("entrance","==",entrance));
			const qurySnapshot= await getDocs(q);
			qurySnapshot.forEach(doc=>{
				console.log("in bulding");
				console.log(doc.id,"===>",doc.data());
				buildingId=doc.id
			});
		}catch{
			console.log("error");
		}


		//add Classification
		let apartmentId;
		const apartNum="1";
		//get the apartment id using the building id from the previos query
		try{
			const apartmentRef= collection(firestore,'apartment');
			const q= query(apartmentRef,where("building","==",buildingId),where("aprt_num","==",apartNum));
			const qurySnapshot= await getDocs(q);
			qurySnapshot.forEach(doc=>{
				console.log("in apartment");
				console.log(doc.id,"===>",doc.data());
				apartmentId=doc.id;
			});
		}catch{
			console.log("error");
		}

	

		//const aprtId=useRef();
	    const data={apartmentId:apartmentId , mainLanguage:"heb",numOfChild:2,numOfDisable:"heb", numOfGrounded:2, numOfUnemployment:2,
		 origin:"heb", readHeb:true, speakHeb:true, writeHeb:false}


		try{
			await addDoc(collection(firestore,'aprt_classification'),data);			
		}catch{
			alert("error");
		}


	/*	
	try{
	 	const Ref=await collection(firestore,'monthly_payment');
	 	const q=await query(Ref,where("building","==","1"));
	 	await (await getDocs(q)).forEach(onSnap=>{
	 		console.log(onSnap.get('amount'));
	 	});
	 }catch{
	 	console.log("error");
	 }
	 */	

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





/*


	}





	return (
		<>
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'>query bank </span>
					{/* <form action=''> *//*}
						{/* Input 1 *//*}
						/*
						<div className='input-group'>
						<button onClick={handleSubmit}>send query</button>
						</div>
						{/* </form> *//*}
				</div>
			</div>
		</>
	);
 }

export default Query;
*/