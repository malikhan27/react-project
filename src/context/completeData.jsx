import { createContext, useState , useEffect} from "react";
import { supabase } from "../utils/config";
import { data } from "react-router";
import { supaAdmin } from "../utils/config";




export const CompleteDataContext = createContext();

export default function CompleteDataProvider({ children }) {
    
   const [completeData, setCompleteData] = useState([]);
   const [sessiondata, setSessionData] = useState([]);
   const [allusersData, setallusersData]=useState([])

   async function fetchCompleteData() {
  try {
      const { data: totaldata, error: totalerror } = await supabase
        .from("loanRequest")
        .select();
      if (totalerror) throw totalerror;
      if (totaldata) {
        setCompleteData(totaldata);
        console.log(totaldata);
      }
    } catch (error) {}
   
   }

   async function fetchSessionData() { 
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session) {
          setSessionData(session);
          console.log(session);
        }
       } catch (error) {
        error.message;
        console.error("Session check failed", error);
       }
   }


    async function fetchusersData () {
    try {
        const { data: { users }, error } = await supaAdmin.auth.admin.listUsers()
       
        if (error) throw error
        if(users){
          console.log(users)
          setallusersData(users)
                }
      }
     catch (error) {
      console.log(error.message)
    }
    }



  const Datastore={
    completeData,
    fetchCompleteData,
    sessiondata,
    fetchSessionData,
    fetchusersData,
    allusersData,
   
    
   }
   

   

   useEffect(() => {
    fetchCompleteData();
    fetchSessionData();
    fetchusersData()
}, []);


    
    return (
     <CompleteDataContext.Provider value={Datastore} refresh={fetchCompleteData} refreshsession={fetchSessionData}>
        {children}
     </CompleteDataContext.Provider>)

}


