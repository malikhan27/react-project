import { createContext, useState , useEffect} from "react";
import { supabase } from "../utils/config";


export const CompleteDataContext = createContext();

export default function CompleteDataProvider({ children }) {
    
   const [completeData, setCompleteData] = useState([]);

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

  const Datastore={
    completeData,
    fetchCompleteData
   }

   useEffect(() => {
    fetchCompleteData();
}, []);


    
    return (
     <CompleteDataContext.Provider value={Datastore} refresh={fetchCompleteData}>
        {children}
     </CompleteDataContext.Provider>)

}


