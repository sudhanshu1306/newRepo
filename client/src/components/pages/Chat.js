import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
import Navhome from '../Navhome'
import '../Chat.css'
import Username from '../Username'
import ChatMsg from '../ChatMsg'
import axios from "axios"

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/message'
  });

export default function Chat() {
   var socket = io('http://localhost:5000/');



  const [users,changeUsers]=useState([]);
  const [message,changeMessage]=useState({});
  const [arr,changeArr]=useState([]);
  const [flag,changeFlag]=useState(false);
  const [data,changeData]=useState(null);
  const [display,changeDisplay]=useState([]);
  // const [text,changeText]=useState("");
  useEffect(()=>{
    socket.on('chat',async function(dat){
       document.getElementById('feedback').innerHTML="";
    await  changeData(dat);
      changeFlag(true);
      console.log(dat);
      // console.log(display);
      //await changeDisplay([...display,dat]);
    });
    socket.on("typing",function(data){
       document.getElementById('feedback').innerHTML='<p><em>'+data+' is typing a message</em></p>'
    })





    api.get("/").then(res=>{
      if(res.data.success){
        var us=res.data.Messages;
         changeUsers(us);
         // console.log(users);
      }
  });
  }, []);
  function handleData(data){
    socket.on('connection',()=>{
          console.log("socket connected");
        });

    changeMessage(data);
    if(message.messages!=undefined){
      var ans=[];
      console.log(message);
       try{
      var arr=JSON.parse(message.messages);
      for(var key in arr)
      ans.push(arr[key]);
      changeDisplay(ans);}
      catch(err)
    {  console.log(err);}
    }
  }
  function showChats(user){
    // console.log(user);
    return (
      <Username
        key={user._id}
        name={user.username}
        pic={user.profileImage}
        id={user._id}
        data={handleData}
      />
    );
  }
   function showMessages(msg){
     var element = document.getElementById("chat");
     element.scrollTop = element.scrollHeight;
     var pic=msg.from===message.from._id?message.from.profileImage:message.to.profileImage;
     return(
       <>
       <ChatMsg key={msg._id}content={msg.content} pic={pic}/><br/>
       </>
     )
   }
   function handleSend(){

      var msg=document.getElementById('message');
      var text=msg.value;
       msg.value="";
     socket.emit('chat',{
       message:text,
       handleFrom:message.from.username,
       from:message.from._id,
       to:message.to._id,
       dp:message.from.profileImage
     });


   }
  function handlePress(event){
    socket.emit("typing",message.from.username);
  }


    return (
        <div>
            <Navhome />
            <div className="usernames">{users.map(showChats)}</div>
            <div className="chatdiv">
                <div className="chatbox" >
                <div className="chat" id="chat">
                   {message.to&& <>
                    <h5>{ message.to.username} </h5>

                    {
                       display.map((item)=> {return item;}).map(showMessages)
                    }

                     </>
                   }
                  {data&& changeDisplay([...display,data])}
                  {data&& changeData(null)}

                </div>
                <div className="feedback" id="feedback"></div>
                <div className="type"><input type="text" onKeyPress={handlePress}  className="typemsg" id="message" placeholder="Type your message"/><i  onClick={handleSend} class="fa fa-paper-plane" aria-hidden="true"></i></div>


                </div>
            </div>
        </div>
    )
}
