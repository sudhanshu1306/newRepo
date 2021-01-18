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
    const [fullname,changeFullName]=useState(0);
    const [bio,changeBio]=useState("");
    const [department,changeDepartment]=useState("");
    const [year,changeYear]=useState("");
    const [college,changeCollege]=useState("");
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
           changeFullName(user.fullName);
           changeBio(user.bio);
           changeYear(user.year);
           changeDepartment(user.department);
           changeCollege(user.college);

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

            <button className="buton1 btn btn-dark edit btn--large" onClick={handleEdit}>Edit Profile</button>

            </div>



            </section>
            </header>
            <h1 className="heading">Posts</h1>
            {ram.map(createPost)}
            </div>
            </section>

        </>
    )
}
