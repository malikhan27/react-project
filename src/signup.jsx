
import { useEffect, useState } from "react";
import { supabase } from "./utils/config";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Signup(){
  const [signupemail,setsignup]=useState("")
  const [signuppassword,setsignuppassword]=useState('')

  
 
    const Createuser = async ()=> {
     
    try {const { data, error } = await supabase.auth.signUp({
        email: signupemail,
        password: signuppassword ,
      })
      if (error) throw error

      
      if (data){
        console.log(data)  
        window.location.href="/login"
      
      }
        
    } catch (error) {
        
    }
    
  } 

  return(
    <>
    <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <h1>SIGN UP HERE</h1>
    <label htmlFor="email">EMAIL</label>
    <input className="mt-2 form-control" id="email" type="text"  onChange={(e)=>setsignup(e.target.value)} />
    <label htmlFor="pass">Password</label>
    <input id="pass" className="mt-2 form-control" type="text"  onChange={(e)=>setsignuppassword(e.target.value)} />
    <button className="mt-2 btn btn-success" onClick={Createuser}> sign up here</button>
    </div>

    </>
  )
}