import React,{useState,useEffect} from 'react'
import './Username.css'
import axios from "axios"

const api=axios.create({
    'Access-Control-Allow-Credentials': true,
    baseURL:'http://localhost:5000/api/search'
  });


export default function Username(props) {

  async function handleSubmit(event) {
      event.preventDefault();
      // console.log(props);
      const user={
        id:props.id
      }
      let obj={};
      await api.post("/", user)
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
        props.data(obj);

  }
    return (
        <div className="user" >
        <div className="name" onClick={handleSubmit}>
        <img src={"http://localhost:5000/"+props.pic} alt="profilepic" className="msgpic"/>
            {props.name}
        </div>
        </div>

    )
}
