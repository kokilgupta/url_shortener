import React, {useState,useEffect} from 'react';
import shortid from 'shortid';
import db from '../firebase/firestore';

const HomePage=()=>{
    const[posts,setPosts]=useState([]);
    const[urls,setUrls]=useState("");
    const[isLoaded, setIsLoaded] = useState(false);
    
  
     const urlChangeHandler=(event)=>{
         setUrls(event.target.value);
     }
     const onClickHandler=()=>{
            const shorten = shortid.generate();
            db.collection("URL").add({
                url: urls,
                shortened_url: shorten,
                user_id:"kokil"
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.path);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
            .finally(()=>{
                setUrls("");
            });
     }
     const pressEnterHandler=(k)=>{
        if(k.keyCode === 13){
            {onClickHandler()}
        }
    }
    useEffect(()=>{
        const fetchData = async  () => {
            const res = db.collection('URL');
            const data = await res.get();
            data.docs.map((doc) => {
                posts.push(doc.data());
            });
        }
        fetchData().then(() => setIsLoaded(true));
   },[]);

    if(!isLoaded) {
        return (
            <div>Loading...</div>
        )
    }

    return(
        <div>
            <input type="text" value={urls} placeholder="Enter your URL" onChange={urlChangeHandler}  onKeyDown={pressEnterHandler}/>
            <input type="button" name="Submit" value="Submit" onClick={onClickHandler} /> 
            {posts.map((item)=> (
                <ul key={item.shortened_url}>
                    <li>{item.url} {item.shortened_url}</li> 
                </ul>
            ))}
        </div> 
    )
}
export default HomePage;