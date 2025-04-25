import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { supabase } from '../utils/config';
import React, { use } from 'react';
import Loader from './loader';
import SimpleCharts from './bar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';








export default function Dashboarddata() { 
  const  [filteredData, setFilteredData] = React.useState([]);
  async function getData() { 
          try {
        const { data, error } = await supabase
      .from('loanRequest')
      .select()
      .eq('status', 'pending')
    if(error)throw error
        if(data) {
         setFilteredData(data)
          console.log(data)
        }
    
      } catch (error) {
        
      }
    
  
   }
   React.useEffect(() => {getData()},[])
  
  return(
    <>
    <Box sx={{ padding: 2, display:'flex', justifyContent: 'center', alignItems: 'center', gap:2 , flexDirection:{xs:"column" , lg:"row" }}}>
   <Card variant='solid' sx={{backgroundColor:'#f1befa', marginTop: 3,  paddingX:3,paddingY:1, textAlign:'center'}}>
      <CardContent >
        <div  style={{color:"#380940"}} className='flex flex-col items-center  gap-4 flex-wrap'>
          <AccessTimeIcon sx={{fontSize: 50}}/>
          <div>
            <h6 className=' fw-bolder'>PENDING REQUEST</h6>
            <h2 className=' fw-bold mt-3'>{!filteredData.length?<Loader/>:filteredData.length}</h2>
          </div>
          
        </div>
        
       
      </CardContent>
    </Card>
    <Card variant='solid' sx={{backgroundColor:'#f1befa', marginTop: 3,  paddingX:3,paddingY:1, textAlign:'center'}}>
      <CardContent >
        <div style={{color:"#380940"}} className='flex flex-col items-center gap-4  flex-wrap'>
          <CheckBoxIcon sx={{fontSize: 52}}/>
          <div>
            <h6 className=' fw-bolder'>APPROVED LOANS</h6>
            <p className=' mt-3'><Loader/></p>
          </div>
          
        </div>
        
       
      </CardContent>
    </Card>


    <Card variant='solid' sx={{backgroundColor:'#f1befa', marginTop: 3,  paddingX:5,paddingY:1, textAlign:'center'}}>
      <CardContent >
        <div style={{color:"#380940"}} className='flex flex-col items-center gap-4  flex-wrap'>
          <TrendingUpIcon sx={{fontSize: 50}}/>
          <div className=''>
            <h6 className='fw-bolder'>TOTAL REQUEST</h6>
            <p className=' mt-3'><Loader/></p>
          </div>
          
        </div>
        
       
      </CardContent>
    </Card>
    <Card variant='solid' sx={{backgroundColor:'#f1befa', marginTop: 3,  paddingX:3,paddingY:1, textAlign:'center'}}>
      <CardContent >
        <div style={{color:"#380940"}} className='flex flex-col items-center gap-4  flex-wrap'>
          <BarChartIcon sx={{fontSize: 50}}/>
          <div className=''>
            <h6 className=' fw-bolder'>TOTAL CUSTOMER</h6>
            <p className=' mt-3'><Loader/></p>
          </div>
        </div>
        
       
      </CardContent>
    </Card>
    </Box>
 <SimpleCharts pendingData={filteredData.length}/>
    </>
   
   
  )
}