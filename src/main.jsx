import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router'
import App from './App.jsx'
import DashboardLayoutAccountSidebar from './pages/dashboard.jsx'
import GetSession from './utils/session.jsx'
import AdminDashboard from './pages/admindashboard.jsx'
import CompleteDataProvider from './context/completeData.jsx'








createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
  <CompleteDataProvider>
    <GetSession/>
     <Routes>
     <Route path='/' element={<App/>}/>
      <Route path='/signup' element={<App/>}/>  
      <Route path='/dashboard' element={<DashboardLayoutAccountSidebar/>}/>
      <Route path='/admindashboard' element={<AdminDashboard/>}/> 
    </Routes>
  </CompleteDataProvider>
    </BrowserRouter>  
  </StrictMode>,
)
