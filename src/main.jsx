import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router'
import App from './App.jsx'
import DashboardLayoutAccountSidebar from './pages/dashboard.jsx'
import GetSession from './utils/session.jsx'
import AdminDashboard from './pages/admindashboard.jsx'








createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <GetSession/>
     <Routes>
     <Route path='/' element={<App/>}/>
      <Route path='/signup' element={<App/>}/>  
      <Route path='/dashboard' element={<DashboardLayoutAccountSidebar/>}/>
      <Route path='/admindashboard' element={<AdminDashboard/>}/> 
    </Routes>
    </BrowserRouter>
      
  </StrictMode>,
)
