import { createContext, useState , useEffect} from "react";
import { supabase } from "../utils/config";


export const CompleteDataContext = createContext();

export default function CompleteDataProvider({ children }) {
    
   const [completeData, setCompleteData] = useState([]);
   const [sessiondata, setSessionData] = useState([]);

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

  const Datastore={
    completeData,
    fetchCompleteData,
    sessiondata,
    fetchSessionData
    
   }

   

   useEffect(() => {
    fetchCompleteData();
    fetchSessionData();
}, []);


    
    return (
     <CompleteDataContext.Provider value={Datastore} refresh={fetchCompleteData} refreshsession={fetchSessionData}>
        {children}
     </CompleteDataContext.Provider>)

}


