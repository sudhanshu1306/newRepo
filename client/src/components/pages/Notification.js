import React, {useState, useEffect} from 'react'
import Navhome from '../Navhome';
import Follow from '../Followrequest';
import Noti from '../Noti'
import Activity from '../Activity';
import About from '../About';
import '../Notification.css';
import Message from '../Message.js';


export default function Notification() {
const [isClicked, setisClicked] = useState(true);
const [buttonText, setbuttonText] = useState("Activity");
const [headingText,setheadingText]=useState("Notification")
const [follow,setFollow]=useState(false);

function handleClick(){
    setisClicked(!isClicked);
    if(isClicked){
        setbuttonText("Notification");
        setheadingText("Activity");
    }
    else{
        setbuttonText("Activity");
        setheadingText("Notification");
    }
    if(follow){
      setFollow(false);
    }


}
function handleFollow(){
  setFollow(true);
  setheadingText("Pending follow-requests");
}


    return (
        <div className="notidiv">
        <Navhome />
            <h1>{headingText}</h1>
       <button className="btn btn-dark " onClick ={handleFollow} >Follow-request</button>
       <button className="btn btn-dark noti-btn" onClick ={handleClick} >{buttonText}</button>

       { isClicked ?!follow&& <Noti /> :!follow&& <Activity /> }
       {follow&& <Follow/>}





        </div>
    )
}
