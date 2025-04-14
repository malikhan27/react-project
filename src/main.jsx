import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router'
import App from './App.jsx'
import Dashboard from './utils/pages/dashboard.jsx'






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<App/>}/>
      <Route path='/signup' element={<App/>}/>  
      <Route path='/dashboard' element={<Dashboard/>}/>
  
    </Routes>
    </BrowserRouter>
      
  </StrictMode>,
)
