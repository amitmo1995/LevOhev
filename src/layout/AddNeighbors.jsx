import React, { useRef } from 'react';
import BackButton from '../features/BackButton';
import { Link , useParams } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {doc,getDoc, addDoc,updateDoc,query,where,getDocs, collection} from 'firebase/firestore';
import HomePageButton from '../features/HomePageButton'


function AddNeighbors() {

	const params= useParams();
	let routBack="/BuildingOperation/"+params.building_id+"/"+params.building_name;
	
	const apartmentRef=useRef();
	const familyRef=useRef();
	const youngRef=useRef();
	const oldRef=useRef();
	const disabledRef=useRef();



	async function handleSubmit(){
		try{
			let neighborExistId=false;
			const buildingId=params.building_id;


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

			//check if the Neighbors already exist
			try{
				const tenantsRef= collection(firestore,'tenants');
				const q= query(tenantsRef,where("building","==",buildingId),where("apartment","==",apartmentRef.current.value));
				const qurySnapshot= await getDocs(q);
				qurySnapshot.forEach(doc=>{
					console.log("in neighborExistId");
					console.log(doc.id,"===>",doc.data());
					neighborExistId=doc.id;
				});
			}catch{
				console.log("error on neighborExistId");
			}

			//if there is exist neighbor update field
			if(neighborExistId){
				const tenantsRef = doc(firestore,'tenants', neighborExistId);

                // update field
                await updateDoc(tenantsRef, {
                    family_name : familyRef.current.value , young : youngRef.current.value 
					, old : oldRef.current.value , disabled : disabledRef.current.value
                });


			}
			else {
				await addDoc(collection(firestore,'tenants'),{building : buildingId, building_num : buildingNum , apartment : apartmentRef.current.value , family_name : familyRef.current.value
					, young : youngRef.current.value , old : oldRef.current.value , disabled : disabledRef.current.value});
			}


			//send massege to the user and clear the field
			alert("הדייר נוסף בהצלחה!!");
			familyRef.current.value="";
			apartmentRef.current.value="";
	        youngRef.current.value="";
	        oldRef.current.value="";
	        disabledRef.current.value="";



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
							<input  placeholder='שם משפחה' type='text' ref={familyRef} required/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
                        <i class="fa-solid fa-house"></i>							<input
								type='number'
								placeholder=' מספר בית'
								required
								min={1}
								ref={apartmentRef}
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
                        <Link to={routBack} className='link'>
							<BackButton />
						</Link>
				</div>
			</div>

		</>
	);
}
export default AddNeighbors;
