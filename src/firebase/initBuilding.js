import { async } from "@firebase/util";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export async function initDB(){

    const buildingRef = collection(firestore,"building");

    ///await- asynchronic function==>try and catch
    await setDoc(doc(buildingRef,"bld_1"),{
        building_id:"bld_id_1",
        HOA_appr_num:"aprt_id_1",
        HOA_chairman:"user_id_1",
        HOA_monthly_payment:200,
        building_num:"aprt_id",
        entrance:"ב",
        manager:"user_id"
    });
}