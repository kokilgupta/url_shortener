import React,{useEffect,useState} from 'react';
import { useParams,useHistory } from 'react-router-dom';
import db from '../firebase/firestore';
import { Spin } from 'antd';


const Page=()=>{
    const [realURL,setRealURL]=useState("");
   // const[isLoaded, setIsLoaded] = useState(false);
    let {id }=useParams();

    useEffect(()=>{
        db.collection('URL').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                 if(id===doc.data().shortened_url) {
                    setRealURL(doc.data().url);
                }
            });
        });
    }, []);

    return(
        <div>
           {!!realURL.length ? (
                <>
                   {window.open(realURL, "_self")}
                </>
           ) : (
               <Spin />
           )}
        </div>
    )
}

export default Page;