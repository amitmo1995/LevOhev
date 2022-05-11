import { useState } from "react";
import { collection } from "firebase/firestore";
import { firestore } from "./firebase";


export async function NewPayment() {
    const [paymentDate, setPaymentDate] = useState("");
    const [payment, setPayment] = useState("");
    const [aprtNum, setAprtNum] = useState("");


    async function addNewCity() {


        //pointer to building collection
        const buildingRef = collection(firestore,"building");
        let bldRef= await aprtbuildingRef.where('userId', '==', aprtNum).get();


        // Create a reference to the apartment collection
       let aprtRef = firestore.collection('apartment');

       // Create a query against the collection
       aprtRef = await aprtRef.where('aprtNum', '==', aprtNum).get();

        await setDoc(
        
            doc(paymentRef, paymentDate),
            {
                paymentDate:paymentDate,
                apr:aprtNum,
                payment:payment
            })
    }

    return <div>
        <input type="text" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
        <input type="text" value={payment} onChange={(e) => setPayment(e.target.value)} />
        <input type="text" value={aprtNum} onChange={(e) => setAprtNum(e.target.value)} />
        <button onClick={addNewCity}> Add new city </button>
    </div>

}