import React, { useEffect, useState } from 'react';
import { Link , useParams } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where, collection, query, getDocs} from 'firebase/firestore';
import HomePageButton from '../features/HomePageButton'


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
	let routToHomeGage="/HoaHomePage/"+params.building_id;
    const [loding,setLoding]=useState(true);
    const [children,setChildren]=useState(<div></div>);
    
    
    let buildingExpens={};
    let keys="";

    ///let children=<div>ijdfoijoirfjo</div>;
    async function getData(){   
    ///get buildingId from the url params 
    let buildingId=params.building_id;
    //get the building expense
    try{
        //get the apartment monthly payment
        let collectionRef=collection(firestore,'monthly_payment');
        let apartQuery= query(collectionRef,where("building","==",buildingId));
        let apartQurySnapshot= await getDocs(apartQuery);
        apartQurySnapshot.forEach(doc=>{
            buildingExpens[doc.id]=doc.data();
            buildingExpens[doc.id]["reason"]="תשלום דירה "+ buildingExpens[doc.id]["apartment_num"];
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
        let temp=keys.map(key=>{
            return (
                <tr>
                     <td>{buildingExpens[key]["amount"]}</td>
                     <td>{buildingExpens[key]["date"].split("-").reverse().join("-")}</td>
                     <td>{buildingExpens[key]["reason"]}</td>
                </tr>
            );
          });
          
          setChildren(temp);
          setLoding(false);
          let reduce=keys.reduce((sum,currentKey)=>sum+parseFloat(buildingExpens[currentKey]["amount"].split(" ").join("")),0).toFixed(2);
          setBalance(reduce);
    }catch{
        console.log("error on apartment id Query");
    }
    }

    useEffect(()=>{getData();},[]);
    //useEffect(()=>{},[children])




	//get the building balance
	const [balance,setBalance]=useState("");


    if(loding){
        return <h1>loding ... </h1>;
    }
   

	return (
		<>
			<div className='tableData'>
            <Link to={routToHomeGage} className='link'><HomePageButton /></Link>
                <h1>מעקב הוצאות/הכנסות</h1>
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
             </div>
		</>
	);
 }

export default BuildingExpenses;
