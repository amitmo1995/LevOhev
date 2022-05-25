import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import BackButton from '../features/BackButton';
import {doc,setDoc,getDoc, addDoc,add, collection,onSnapshot} from 'firebase/firestore';
import {firestore} from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import HomePageButton from '../features/HomePageButton'

function GivingScholarship() {

	const amountRef=useRef();
	const navigate=useNavigate();
	let bool=false;
	function handleSubmit(){
		try{
			let today=new Date();
			let date=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
			const building=JSON.parse(localStorage.getItem('userConnected')).data.building;
			addDoc(collection(firestore,'grant_payment'),{amount : amountRef.current.value , building : localStorage.getItem('chosen') , date : date});	
			bool=true;	
		}catch{
			alert("error");
		}finally{
			if(bool){
				navigate(-1);
			}
		}
	}



	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
			<h1>הזן את סכום המלגה</h1>
            <div className='Scholarship'>
                        <div className='input-group'>
							<input ref={amountRef} type ='text' placeholder='סכום'/>
							<span className='bar'></span>
						</div>
                <button className='ok' onClick={handleSubmit}><h2>אישור</h2></button>
            </div>
			<Link to='/FinancialManagement' className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default GivingScholarship;
