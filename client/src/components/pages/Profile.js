import React, {useState, useEffect} from 'react'
import '../Profile.css'
import {Link,useHistory} from 'react-router-dom';
import Navhome from '../Navhome'
import axios from "axios";
import Post from "../Post";

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/profile'
  });

 export default function Profile() {

    let history=useHistory();
    function handleEdit(){
      history.push("/edit");
    }


    const [post,changePost]=useState(0);
    const [follower,changeFollower]=useState(0);
    const [following,changeFollowing]=useState(0);
    var [krishna,changeKrishna] = useState([]);
    var user=[];
    // const [ram,changeram]=useState()
    const [ram,changeram]=useState([]);




      useEffect(()=>{ api.get("/").then(res=>{
           if(res.data.success){
            changeKrishna(res.data.user);
            changeram(res.data.posts);
            user=res.data.user;

           }
           // console.log(krishna);
           changePost( user.post.length);
           changeFollower( user.follower.length);
           changeFollowing( user.following.length);


    });
      }, []);


function createPost(photo){
  console.log("http://localhost:5000/"+krishna.ProfileImage);
    return (
      <Post
      key={photo._id}
      src={photo.pic}
      name={krishna.fullName}
      caption={photo.caption}
      like={photo.like}
      comment={photo.comment}
      current={krishna._id}
      id={photo._id}
      />
    );
  }



    return (
        <div >
        <Navhome />

            <img src={"http://localhost:5000/"+krishna.profileImage} className="dp"/>
            <div className="data">
                <div className="pro-data"><div className="num" id="posts">{post}</div><div className="pro-text">Posts</div></div>
                <div className="pro-data"><div className="num" id="followers">{follower}</div><div className="pro-text">Followers</div></div>
                <div className="pro-data"><div className="num" id="following">{following}</div><div className="pro-text">Following</div></div>
            </div>
            <button className="btn btn-dark edit btn--large" onClick={handleEdit}>Edit Profile</button>
            <h1 className="heading">Posts</h1>
            {ram.map(createPost)}

        </div>
    )
}
