import { BrowserRouter, Route, Routes,} from 'react-router-dom'
import ScrollToTop from './components/Scrolltotop';
import Login from './pages/Login'
import Home from './pages/Home'
import Rap from './pages/Rap'
import Instructors from './pages/Instructors'
import Gallery from './pages/Gallery'
import Contacts from './pages/Contacts'

import Ethic from './pages/identity/Ethic'
import Map from './pages/identity/Map';
import Simbolismos from './pages/identity/Simbolismos';

import Biblioteca from './pages/Biblioteca';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* Págins principales */}
        <Route path='/' element={<Home/>}/>
        <Route path='values' element={<Ethic/>}/>
        <Route path='instructors' element={<Instructors/>}/>
        <Route path='gallery' element={<Gallery/>}/>

        <Route path='contacts' element={<Contacts/>}/>
        {/* Páginas de Identidad */}
        <Route path='/identity/values' element={<Ethic/>}/>
        <Route path='/identity/structure' element={<Map/>}/>
        <Route path='/identity/simbolismos' element={<Simbolismos/>}/>

        {/* Biblioteca SPA */}
        <Route path='/biblioteca' element={<Biblioteca/>}/>
        
        {/* Legacy routes - redirect to Biblioteca */}
        <Route path='/library/regulations' element={<Biblioteca/>}/>
        <Route path='/library/disciplinary' element={<Biblioteca/>}/>
        <Route path='/library/internal' element={<Biblioteca/>}/>
        <Route path='/library/procedures' element={<Biblioteca/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
