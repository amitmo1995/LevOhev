import React, { useEffect, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link , useParams } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where, collection, query, getDocs} from 'firebase/firestore';
import HomePageButton from '../features/HomePageButton'

let getBuildingBalance=async function(setBalance,buildingId){

	let buildingExpens={};
let keys="";

//get the building expense
try{
	//get the apartment monthly payment
	let collectionRef=collection(firestore,'monthly_payment');
	let apartQuery= query(collectionRef,where("building","==",buildingId));
	let apartQurySnapshot= await getDocs(apartQuery);
	apartQurySnapshot.forEach(doc=>{
		buildingExpens[doc.id]=parseFloat(doc.data().amount);
	});

	//get the apartment HOA expanse
	collectionRef=collection(firestore,'HOA_expense');
	apartQuery= query(collectionRef,where("building","==",buildingId));
	apartQurySnapshot= await getDocs(apartQuery);
	apartQurySnapshot.forEach(doc=>{
		//add negative sign to the expense
		buildingExpens[doc.id]=(-parseFloat(doc.data().amount));
	});
	//get the grant payment
	collectionRef=collection(firestore,'grant_payment');
	apartQuery= query(collectionRef,where("building","==",buildingId));
	apartQurySnapshot= await getDocs(apartQuery);
	apartQurySnapshot.forEach(doc=>{
		buildingExpens[doc.id]=parseFloat(doc.data().amount);
	});
	console.log(buildingExpens)


   keys=Object.keys(buildingExpens);
   let temp=keys.reduce((sum,currentKey)=>sum+buildingExpens[currentKey],0);
   console.log(temp);
   setBalance(temp); 

}catch{
	console.log("error on apartment id Query");
}

}

let sortByDate=function(date_1,date_2){

    date_1=date_1.split('-');
    date_2=date_2.split('-');

    //compare year
    date_1[0]=parseInt(date_1[0]);
    date_2[0]=parseInt(date_2[0]);
    if( date_1[0]>date_2[0]){
        return 1;
    }else if(date_2[0]> date_1[0]){
        return -1;
    }

    //compare mounth
    date_1[1]=parseInt(date_1[1]);
    date_2[1]=parseInt(date_2[1]);
    if( date_1[1]>date_2[1]){
        return 1;
    }else if(date_2[1]> date_1[1]){
        return -1;
    }

    //compare day
    date_1[2]=parseInt(date_1[2]);
    date_2[2]=parseInt(date_2[2]);
    if( date_1[2]>date_2[2]){
        return 1;
    }else if(date_2[2]> date_1[2]){
        return -1;
    }
    return 0;
}

function BuildingExpenses(props) {

    const params= useParams();
    let routBack="/FinancialManagement/"+params.building_id+"/"+params.building_name;
    const [loding,setLoding]=useState(true);
    const [children,setChildren]=useState(<div></div>);
    
    
    let buildingExpens={};
    let keys="";

    async function getData(){   
    ///get buildingId from the url param 
    let buildingId=params.building_id;
    //get the building expense
    try{
        //get the apartment monthly payment
        let collectionRef=collection(firestore,'monthly_payment');
        let apartQuery= query(collectionRef,where("building","==",buildingId));
        let apartQurySnapshot= await getDocs(apartQuery);
        apartQurySnapshot.forEach(doc=>{
            buildingExpens[doc.id]=doc.data();
            buildingExpens[doc.id]["reason"]="תשלום דירה "+ buildingExpens[doc.id]["apartment"];
            //add color to the table row
            buildingExpens[doc.id]["color"]="green";
        });

        //get the apartment HOA expanse
        collectionRef=collection(firestore,'HOA_expense');
        apartQuery= query(collectionRef,where("building","==",buildingId));
        apartQurySnapshot= await getDocs(apartQuery);
        apartQurySnapshot.forEach(doc=>{
            buildingExpens[doc.id]=doc.data();
            //add negative sign to the expense
            buildingExpens[doc.id]["amount"]="- "+ String(buildingExpens[doc.id]["amount"]);
            //add color to the table row
            buildingExpens[doc.id]["color"]="red";
        });
        //get the grant payment
        collectionRef=collection(firestore,'grant_payment');
        apartQuery= query(collectionRef,where("building","==",buildingId));
        apartQurySnapshot= await getDocs(apartQuery);
        apartQurySnapshot.forEach(doc=>{
            buildingExpens[doc.id]=doc.data();
            buildingExpens[doc.id]["reason"]="מענק מהעיריה לוועד הבית";
            //add color to the table row
            buildingExpens[doc.id]["color"]="green";
        });



        keys=Object.keys(buildingExpens);
        //sort the result by date
        keys.sort((key1,key2)=>{return sortByDate(buildingExpens[key1]["date"],buildingExpens[key2]["date"]);});
        //set the result in descending order
        keys.reverse();
        console.log("map");
        let temp=keys.map(key=>{
            console.log(buildingExpens[key]["date"]);
            console.log(buildingExpens[key]["amount"]);
            return (
                <tr>
                     <td>{buildingExpens[key]["amount"]}</td>
                     <td>{buildingExpens[key]["date"].split("-").reverse().join("-")}</td>
                     <td>{buildingExpens[key]["reason"]}</td>
                </tr>
            );
          });
          console.log(" end map");
          console.log(children);
          setChildren(temp);
          console.log(children);
          setLoding(false);
    }catch{
        console.log("error on apartment id Query");
    }
    }
    const [balance,setBalance]=useState("");
	useEffect(()=>{getBuildingBalance(setBalance,params.building_id);},[]);

    useEffect(()=>{getData();},[]);


    if(loding){
        return <h1>loding ... </h1>;
    }
   

	return (
		<>
			<div className='tableData'>
            <Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
                <h1>מעקב הוצאות/הכנסות</h1>
                <table>
                    <thead>
                        <tr>
                            <th>סכום</th>
                            <th>תאריך</th>
                            <th>תיאור</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>יתרה בחשבון</th>
                        </tr>
                        <tr>
                        <th>{balance}</th>
                        </tr>
                </thead>
                </table>
                <Link to={routBack} className='link'>
                    <BackButton />
                </Link>
             </div>
		</>
	);
 }

export default BuildingExpenses;
