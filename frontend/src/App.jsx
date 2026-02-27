import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import ScrollToTop from './components/Scrolltotop';
import Login from './pages/Login'
import Home from './pages/Home'
import Rap from './pages/Rap'
import Gallery from './pages/Gallery'
import Contacts from './pages/Contacts'

import Minstitucional from './pages/organic/Minstitucional'
import Instructors from './pages/organic/Instructors';
import Brigs from './pages/organic/brigs'
import Comandantes from './pages/organic/comandantes'

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
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='rAP' element={<Rap />} />
        <Route path='values' element={<Ethic />} />
        <Route path='gallery' element={<Gallery />} />
        <Route path='contacts' element={<Contacts />} />


        <Route path='/organic/minstitucional' element={<Minstitucional />} />
        <Route path='/organic/instructors' element={<Instructors />} />
        <Route path='/organic/brigs' element={<Brigs />} />
        <Route path='/organic/comandantes' element={<Comandantes />} />

        {/* Páginas de Identidad */}
        <Route path='/identity/values' element={<Ethic />} />
        <Route path='/identity/structure' element={<Map />} />
        <Route path='/identity/simbolismos' element={<Simbolismos />} />

        <Route path='/library/regulations' element={<Biblioteca />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
