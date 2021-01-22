import React,{useState,useEffect} from 'react'
import './Username.css'
import axios from "axios"

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api'
  });


export default function Followcard(props) {
  async function handleAccept(event){
    event.preventDefault();
    const user={
      id:props.id
    }
    console.log(user);
    await api.post("/accept",user)
    .then(function(res){
      console.log(res.data);
      if(res.data.success)
      {console.log("Accepted follow request");
      alert("Follow request accepted");}
    });
  }

  async function handleSubmit(event) {
      event.preventDefault();
      const user={
        id:props.id
      }
      props.data(user);

  }
    return (
        <div className="user" >
        <div className="name" >
        <img onClick={handleSubmit} src={"http://localhost:5000/"+props.pic} alt="profilepic" className="msgpic"/>
            <span onClick={handleSubmit}>{props.name} </span>
            <br/>
            <i className="fas fa-2x fa-check-circle" onClick={handleAccept}></i><span>                 </span>
            <i className="fas fa-2x fa-times-circle"></i>

        </div>

        </div>

    )
}
