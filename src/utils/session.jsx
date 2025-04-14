import { supabase } from "./config";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";



export default function GetSession() {
   
        const location = useLocation() 
        console.log(location.pathname)
    
    
    const navigatepage = useNavigate()
 const sessioncall= async () =>{
    
    try {
        const { data:{session}, error } = await supabase.auth.getSession()
        if (error) throw error

        const authPages = [ "/signup", "/"];
        const currentPath = location.pathname;
        const isAuthPage = authPages.some((page) => page.includes(currentPath));
    
        if(session) {
            if (isAuthPage) {
                navigatepage("/dashboard")
              }
            } else {
              if (!isAuthPage) {
               navigatepage("/signup")
              }
        }
        
    } catch (error) {
        
    }
   
 }
 
    sessioncall()   
}
