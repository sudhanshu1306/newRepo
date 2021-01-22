import React,{useState,useEffect} from 'react'
import Followcard from './Followcard.js';
import { Link,useHistory } from 'react-router-dom';
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api'
  });

export default function Activity() {
  const [pending, changePending] = useState([]);
  var history=useHistory();


 useEffect(()=>{ api.get("/follow").then(res=>{
     console.log(res.data);
     if(res.data.success){
        changePending(res.data.Users);
     }
 });
 }, []);
 async function handleData(data){
   console.log(data);
   const user={
     id:data.id
   }
   let obj={};
   await api.post("/search", user)
   .then(function (res) {
       // console.log(res.data);
       if(res.data.success){
          obj=res.data;


       }
     })
     .catch(function (error) {
       console.log(error);
     });
     console.log(obj);
     // eslint-disable-next-line no-restricted-globals
      history.push({pathname:"/searchProfile",state:{ data:obj}})
 }
 function showPending(user){
      console.log(user);

       return (
         <Followcard
         name= {user.username}
         pic={user.profileImage}
         key={user._id}
         id={user._id}
         data={handleData}
         />
       );
     }
    return (
      <div>
          {pending.map(showPending)}
      </div>
    )
}
