import { useState } from "react";

export function newBuilding(Building_id,,HOA_chairman,HOA_monthly_payment,
    building_num ,entrance ,manager) {
        
    const [name, setName] = useState("")

    async function addNewBuilding() {
        await setDoc(
            doc(citiesRef, name),
            {
                Building_id: Building_id,
                HOA_appr_num:HOA_appr_num ,
                HOA_chairman: HOA_monthly_payment
            })
    }

    return <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={addNewCity}> Add new city </button>
    </div>

}