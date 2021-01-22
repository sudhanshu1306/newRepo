import React, {useState, useEffect} from 'react'
import '../Profile.css'
import {Link,useHistory} from 'react-router-dom';
import Navhome from '../Navhome'
import axios from "axios";
import Post from "../Post";

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api'
  });

 export default function Profile() {

    let history=useHistory();

    const [post,changePost]=useState(0);
    const [follower,changeFollower]=useState(0);
    const [following,changeFollowing]=useState(0);
    const [fullname,changeFullName]=useState(0);
    const [bio,changeBio]=useState("");
    const [department,changeDepartment]=useState("");
    const [year,changeYear]=useState("");
    const [college,changeCollege]=useState("");
    var [krishna,changeKrishna] = useState([]);
    const [flag,changeFlag]=useState(false);
    var user=[];
    // const [ram,changeram]=useState()
    const [ram,changeram]=useState([]);
    const [current,changeCurrent]=useState([]);
    function handleClick(event){
      if(!flag){
      var obj={
        id:krishna._id
      }
      api.post("/follow",obj)
      .then((res)=>{
        if(res.data.success){
          alert("Follow request sent");
        }
      });}
      else
      alert("Already following");
    }


      useEffect(()=>{
         console.log(history.location.state);

           var data=history.location.state.data;
           user=data.user;
           // console.log(krishna);
           changePost( user.post.length);
           changeFollower( user.follower.length);
           changeFollowing( user.following.length);
           changeFullName(user.fullName);
           changeBio(user.bio);
           changeYear(user.year);
           changeDepartment(user.department);
           changeCollege(user.college);
           changeKrishna(user);
           changeram(data.post);
           changeCurrent(data.current);
           // changeram(user.post);
           if(data.current.following.indexOf(user._id)!== -1)
           changeFlag(true);
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
      current={current._id}
      id={photo._id}
      />
    );
  }



    return (
        <>
        <section>
        <Navhome />
            <div className="div1">
            <header className="head1">
            <div className="div2">
            <div className="div3">
            <div className="div4">
                 <img src={"http://localhost:5000/"+krishna.profileImage} className="dp"/>
                 </div>
                 </div>
                 <br />
                 <div className="num">{fullname}</div>
                 <br />

                 <div className="div7">
                 <p className="h2class">{year} year  {department} {college}</p>
                 <br />
                 <span className="span1">
              {bio}
            </span>
            </div>

                 <br />

                 </div>
                 <section className="section1">
                 <div className="data">



                <div className="pro-data"><div className="num1" id="posts">{post}</div><div className="num2">Posts</div></div>
                <div className="pro-data"><div className="num1" id="followers">{follower}</div><div className="num2">Followers</div></div>
                <div className="pro-data"><div className="num1" id="following">{following}</div><div className="num2">Following</div></div>
                </div>


            <br />

            <div className="div6">

            <button className="buton1 btn btn-dark edit btn--large" onClick={handleClick} >{flag?<>Following</>:<>Follow</>}</button>
           <button className="buton1 btn btn-dark edit btn--large" >Message</button>
            </div>



            </section>
            </header>
            <h1 className="heading">{flag?<>Posts</>:<>Follow to see posts</>}</h1>
            {flag&&ram.map(createPost)}
            </div>
            </section>

        </>
    )
}
