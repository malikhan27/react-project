
import { useEffect, useState } from "react";
import { supabase } from "./utils/config";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(){
  const [loginemail,setlogin]=useState("")
  const [loginpassword,setloginpassword]=useState('')
  
 
    const Loginuser = async ()=> {
   try {const { data, error } = await supabase.auth.signInWithPassword({
   email: loginemail,
   password: loginpassword ,
  })
  if(data){
    console.log(data)
  }

   } catch (error) {
    
   }
  }
  return(
    <>
    <div style={{display:"flex", flexDirection:"column"}}>
      <h1>login HERE</h1>
      <label htmlFor="email">EMAIL</label>
    <input className="mt-2 form-control" id="email" type="text"  onChange={(e)=>setlogin(e.target.value)} />
    <label htmlFor="pass">Password</label>
    <input id="pass" className="mt-2 form-control" type="text"  onChange={(e)=>setloginpassword(e.target.value)} />
    <button className="mt-2 btn btn-success" onClick={Loginuser}>login here</button>
    </div>

    </>
  )
}