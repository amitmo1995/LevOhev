import React, { useRef, useState } from 'react';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import emailjs from 'emailjs-com';
import { Link , useParams , useNavigate } from 'react-router-dom';
import BackButton from '../features/BackButton';
import { doc,getDoc, addDoc,updateDoc,query,where,getDocs, collection} from 'firebase/firestore';
import {firestore} from '../firebase/firebase'
import HomePageButton from '../features/HomePageButton'
import { LogoutButton } from '../features/LogoutButton';




function SetMessage() {

    const navigate=useNavigate();
    const messageRef=useRef();
    const emailBody=useRef();
    const emailRef=useRef();
    const form = useRef();
    const [isChecked, setIsChecked] = useState(false)
    let id;

    const checkHandler = () => {
        setIsChecked(!isChecked)
      }


    const sendEmail = async (meeting) => {
        emailBody.current.value=messageRef.current.value;
		let tempEmail="";
		try{
		  
				const buildingRef= collection(firestore,'users');
				const q= query(buildingRef);
				const qurySnapshot= await getDocs(q);
				qurySnapshot.forEach(doc=>{
					tempEmail+=","+doc.id;
				});
			}catch{
                alert("שליחת המייל נכשלה.");
				console.log("error");
			}
		tempEmail=tempEmail.substring(1);
		
		///delete before production
		tempEmail="";
	
		emailRef.current.value=tempEmail;
		emailjs.sendForm('service_f0pei3a', 'template_8q4jwsh', form.current, '9rAST6Xc6VoGnwDQa')
		  .then((result) => {
			  alert("המייל נשלח בהצלחה");
              navigate(-1);
		  }, (error) => {
			  alert("שליחת המייל נכשלה");
              navigate(-1);
		  });
	
		
	  };










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

            if(isChecked)
                sendEmail();




        }catch{
            console.log("error on neighborExistId");
            alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
            navigate(-1);
        }finally{
            if(!isChecked)
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

                    <input type="checkbox" id="checkbox" checked={isChecked} onChange={checkHandler}
      />                    <label for="sendEmail">שלח הודעה במייל</label><br></br>

						<button onClick={handleSubmit}>
							פרסם
						</button>
					</div>
				</div>
                <form  hidden id='form1' ref={form} onSubmit={sendEmail}>
                <input ref={emailBody} id="email" type="text" name="managerMessage" />
      <input ref={emailRef} id="email" type="email" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
			</div>
	);
}

export default SetMessage;
