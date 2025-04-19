import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';











export default function Dashboarddata() { 
  return(
    <Box sx={{ padding: 2, display:'flex', justifyContent: 'center', alignItems: 'center', gap:2 , flexDirection:{xs:"column" , lg:"row" }}}>
   <Card variant='solid' sx={{backgroundColor:'beige',color:"black", marginTop: 3,  paddingX:3,paddingY:2, textAlign:'center'}}>
      <CardContent >
        <div className='flex flex-row items-center gap-4 flex-wrap'>
          <CalendarTodayIcon sx={{fontSize: 50}}/>
          <div>
            <h4>ACTIVE LOAN </h4>
            <p className='text-dark'>2</p>
          </div>
          
        </div>
        
       
      </CardContent>
    </Card>
    <Card variant='solid' sx={{backgroundColor:'beige',color:"black", marginTop: 3,  paddingX:3,paddingY:2, textAlign:'center'}}>
      <CardContent >
        <div className='flex flex-row items-center gap-4 flex-wrap'>
          <CalendarTodayIcon sx={{fontSize: 52}}/>
          <div>
            <h4>ACTIVE LOAN </h4>
            <p className='text-dark'>2</p>
          </div>
          
        </div>
        
       
      </CardContent>
    </Card>


    <Card variant='solid' sx={{backgroundColor:'beige',color:"black", marginTop: 3,  paddingX:3,paddingY:2, textAlign:'center'}}>
      <CardContent >
        <div className='flex flex-row items-center gap-4 text-dark flex-wrap'>
          <CalendarTodayIcon sx={{fontSize: 50}}/>
          <div className='text-dark'>
            <h4>ACTIVE LOAN </h4>
            <p className='text-dark'>2</p>
          </div>
          
        </div>
        
       
      </CardContent>
    </Card>
    </Box>

   
  )
}