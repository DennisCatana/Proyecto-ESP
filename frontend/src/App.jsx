import { BrowserRouter, Route, Routes,} from 'react-router-dom'
import ScrollToTop from './components/Scrolltotop';
import Login from './pages/Login'
import Home from './pages/Home'
import Instructors from './pages/Instructors'
import Gallery from './pages/Gallery'
import Contacts from './pages/Contacts'

import Ethic from './pages/identity/Ethic'
import Map from './pages/identity/Map';
import Simbolismos from './pages/identity/Simbolismos';

import Regulations from './pages/library/Regulations'

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* Págins principales */}
        <Route path='/' element={<Home/>}/>
        <Route path='rAP' element={<no/>}/>
        <Route path='values' element={<Ethic/>}/>
        <Route path='instructors' element={<Instructors/>}/>
        <Route path='gallery' element={<Gallery/>}/>

        <Route path='contacts' element={<Contacts/>}/>
        {/* Páginas de Identidad */}
        <Route path='/identity/values' element={<Ethic/>}/>
        <Route path='/identity/structure' element={<Map/>}/>
        <Route path='/identity/simbolismos' element={<Simbolismos/>}/>

        <Route path='/library/regulations' element={<Regulations/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
