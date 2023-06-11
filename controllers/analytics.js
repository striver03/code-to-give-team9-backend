import db from "../db/connect.js";
const districtCollection = db.collection("districts");
import { distArr } from "../local/district-data.js";


const getData = async(req,res)=>{
    let allDistData = [];
    for(let i=0;i<distArr.length;i++)
    {
        const dist = distArr[i];
        const districtDocRef = districtCollection.doc(dist);
        try {
            const snapshot = await districtDocRef.get();
            if(snapshot.exists)
            {
                allDistData.push(snapshot.data());
            }
        } catch (error) {
            res.json("Fetching Failed with error:"+error);
        }
    }
    res.status(200).json({data:allDistData});
};

export {getData};