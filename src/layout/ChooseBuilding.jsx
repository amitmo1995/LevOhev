import React from 'react';
import { Link } from 'react-router-dom';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import BackButton from '../features/BackButton';
import HomePageButton from '../features/HomePageButton'
import {firestore} from '../firebase/firebase';
import {where,doc,setDoc,getDoc, addDoc,add, collection,onSnapshot, query, getDocs} from 'firebase/firestore';


 function ChooseBuilding() {
	let buildingParse=["3 A","3 B","4 A","4 B","5","6","7","8 A","8 B","9 A","9 B","10 A","10 B","11 A","11 B","13 A","13 B","15 A","15 B","17","18 A","18 B","22 A","22 B","24 A","24 B"];
	let [options, optionName] = [[], ''];
	for (let i = 1; i <= 26; i++) {
		let option_Name = 'בניין ' + buildingParse[i-1];
		// options[i] = <Option optionName={option_Name} imgAdd={buildingImg} />;
		options[i] = (
			<Link to='/BuildingOperation' className='link' key={i} onClick={async () => {
				let apartmentId=i;
				try{
					const apartmentRef= collection(firestore,'building');
					const q= query(apartmentRef,where("building_num","==",buildingParse[i-1].split(" ")[0]),where("entrance","==",buildingParse[i-1].split(" ")[1]));
					console.log(buildingParse[i-1].split(" ")[0]);
					console.log(buildingParse[i-1].split(" ")[1]);
					const qurySnapshot= await getDocs(q);
					console.log(buildingParse[i-1].split(" ")[1]);
					qurySnapshot.forEach(doc=>{
						console.log("in apartment");
						console.log(doc.id,"===>",doc.data());
						apartmentId=doc.id;
					});
				}catch{
					console.log("error");
				}
				localStorage.setItem('chosen',apartmentId);
			}
			}>
				{' '}
				<Option optionName={option_Name} imgAdd={buildingImg} />
			</Link>
		);
	}
	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
			<h1>בחר בניין</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/ManagerHomePage' className='link link-button'>
				<BackButton />
			</Link>
		</div>
	);
}

export default ChooseBuilding;
