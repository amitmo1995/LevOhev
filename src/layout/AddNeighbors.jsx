import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where,doc,setDoc,getDoc, addDoc,add, collection,onSnapshot, query, getDocs} from 'firebase/firestore';
import HomePageButton from '../features/HomePageButton'


function AddNeighbors() {

	const departmentRef=useRef();
	const familyRef=useRef();
	const youngRef=useRef();
	const oldRef=useRef();
	const disabledRef=useRef();



	async function handleSubmit(){
		try{
			//const buildingId=localStorage.getItem('chosen');


//test mode
const buildingId = "3OObhsydhrbsH73QL66h";


			let buildingNum="-";
			//get the building info
			const docRef = doc(firestore,'building',buildingId);
			const docSnap =await getDoc(docRef);
			if(docSnap.exists()){
				let temp=docSnap.data();
				buildingNum=temp["building_num"];
				if(temp["entrance"]!="")
				    if(temp["entrance"]=="A")
					    buildingNum+=" א";
					else
					    buildingNum+=" ב";
			}else{
				console.log("no such document!");
			}
			
			await addDoc(collection(firestore,'tenants'),{building : buildingId, building_num : buildingNum , department : disabledRef.current.value , family_name : familyRef.current.value
			, young : youngRef.current.value , old : oldRef.current.value , disabled : disabledRef.current.value});			
		}catch{
			alert("error");
		}
	}


	return (
		<>
			<div className='wrapper'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>

				<div className='formContainer'>
					<span className='formHeading'>הוספת דייר</span>
						<div className='input-group'>
                        <i class="fa-solid fa-people-roof"></i>
							<input  placeholder='שם משפחה' type='text' ref={familyRef}/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
                        <i class="fa-solid fa-house"></i>							<input
								type='number'
								placeholder=' מספר בית'
								required
								min={1}
								ref={departmentRef}
							/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-children"></i>
							<input
								type='number'
								placeholder='מספר נפשות מתחת לגיל 18'
								required
								min={1}
								ref={youngRef}
							/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-users"></i>
							<input
								type='number'
								placeholder='מספר נפשות מעל גיל 18'
								required
								min={1}
								ref={oldRef}
							/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-file-medical"></i>
							<input
								type='number'
								placeholder='מספר נפשות עם בעיות רפואיות (אם קיים..)'
								required
								min={1}
								ref={disabledRef}
							/>
							<span className='bar'></span>
						</div>
                        
						<div className='input-group'>
						<button onClick={handleSubmit}>אישור</button>
						</div>
                        <Link to='/BuildingOperation' className='link'>
							<BackButton />
						</Link>
				</div>
			</div>

		</>
	);
}
export default AddNeighbors;
