import React,{useEffect,useState} from 'react';
import { useParams,useHistory } from 'react-router-dom';
import db from '../firebase/firestore';


const Page=()=>{
    const [realURL,setRealURL]=useState("");
    let {id }=useParams();
    let history=useHistory();

    useEffect(()=>{
        db.collection("URL").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(id===doc.data().shortened_url) {
                    setRealURL(doc.data().url)
                    window.open(realURL, "_self");
                }
            });
        });
    }, []);

    return(
        <div>
           
        </div>
    )
}
export default Page;