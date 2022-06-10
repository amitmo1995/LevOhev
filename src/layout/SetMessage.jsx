import React, { useRef, useState } from 'react';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import { Link , useParams , useNavigate } from 'react-router-dom';
import BackButton from '../features/BackButton';
import { doc,getDoc, addDoc,updateDoc,query,where,getDocs, collection} from 'firebase/firestore';
import {firestore} from '../firebase/firebase'
import HomePageButton from '../features/HomePageButton'
import { LogoutButton } from '../features/LogoutButton';




function SetMessage() {

    const navigate=useNavigate();
    const messageRef=useRef();
    let id;

    async function handleSubmit(){


        try{
            const tenantsRef= collection(firestore,'message');
            const q= query(tenantsRef);
            const qurySnapshot= await getDocs(q);
            qurySnapshot.forEach(doc=>{
                id=doc.id;
            });
        }catch{
            console.log("error on neighborExistId");
            alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
            navigate(-1);
        }





        try{
            const publishRef = doc(firestore,'message',id);
	
            // update field
            await updateDoc(publishRef, {
                message : messageRef.current.value
            });
        }catch{
            console.log("error on neighborExistId");
            alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
            navigate(-1);
        }finally{
            navigate(-1);
        }
    }




	return (
		<div className='wrapper'>
				<Link to='/ManagerHomePage' className='link'>
					<HomePageButton />
				</Link>
				<Link to='/' className='link'>
					<LogoutButton />
				</Link>
				<div className='formContainer'>
					<span className='formHeading'>פרסם הודעה</span>
					{/* <form action=''> */}
					{/* Input 1 */}
					<div className='input-group'>
						<input
							ref={messageRef}
							placeholder='הודעה'
							text='כתוב הודעה'
							type='text'
						/>
						<span className='bar'></span>
					</div>
					
					{/* Input 1 */}
					<div className='input-group'>
						<button onClick={handleSubmit}>
							פרסם
						</button>
					</div>
				</div>
			</div>
	);
}

export default SetMessage;
