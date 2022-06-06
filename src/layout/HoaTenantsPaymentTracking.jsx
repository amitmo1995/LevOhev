import React, { useEffect, useState } from 'react';
import { Link , useParams , useNavigate } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where, collection, query, getDocs} from 'firebase/firestore';
//import {sortByDate} from '../features/sortByDate';
import HomePageButton from '../features/HomePageButton'


//get two date elment in format "yyyy-mm-dd"
//#return if date_1 erlier return 1 if they equal return 0 else -1
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


function TrackingPayment(props) {
    //object of the url parameters
    const params= useParams();
    const navigate = useNavigate();
	let routToHomeGage="/HoaHomePage/"+params.building_id;
    const [loding,setLoding]=useState(true);
    const [children,setChildren]=useState(<div></div>);
    const [balance,setBalance]=useState("");



    let buildingExpens={};
    let keys="";


    async function getData(){   
        ///get buildingId from the url param 
        let buildingId=params.building_id
        //get the building expense
        try{
            //get the apartment monthly payment
            let collectionRef=collection(firestore,'monthly_payment');
            let apartQuery= query(collectionRef,where("building","==",buildingId));
            let apartQurySnapshot= await getDocs(apartQuery);
            apartQurySnapshot.forEach(doc=>{
                buildingExpens[doc.id]=doc.data();
                buildingExpens[doc.id]["reason"]="תשלום וועד דירה "+ buildingExpens[doc.id]["apartment_num"];
            });
            keys=Object.keys(buildingExpens);
            //sort the result by date
            keys.sort((key1,key2)=>{return sortByDate(buildingExpens[key1]["date"],buildingExpens[key2]["date"]);});
            //set the result in descending order
            keys.reverse();

            //set the DOM objebt to dislay all the payment
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
        //set the DOM objebt to dislay sum of the payment
        let reduce=keys.reduce((sum,currentKey)=>sum+parseFloat(buildingExpens[currentKey]["amount"]),0);
        setBalance(reduce);
    }catch{
        alert("משהו השתבש, אנא נסה/י שנית מאוחר יותר");
        console.log("error on apartment Query");
        navigate(-1);
    }
}


useEffect(()=>{getData();},[]);
if(loding){
    return <h1>loding ... </h1>;
}
	return (
		<>
			<div className='tableData'>
            <Link to={routToHomeGage} className='link'><HomePageButton /></Link>
                <h1>מעקב תשלומי וועד</h1>
                <table>
                    <thead>
                        <tr>
                            <th>סך הכל</th>
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

export default TrackingPayment;