import { supabase } from "./config";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";



export default function GetSession() {
   
    
    
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
              console.log(currentPath)
              if (!isAuthPage) {
               navigatepage("/")
              }
        }
        
    } catch (error) {
        
    }
   
 }
 useEffect(() => {
  const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      console.log('User signed in!', session);
      sessioncall()
    }
  });

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);
 
  

 sessioncall()

    
}
