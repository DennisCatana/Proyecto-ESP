import { lazy, Suspense, Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/Scrolltotop'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null }}

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
          <div className="text-center p-8">
            <h1 className="text-2xl text-white mb-4">Algo salió mal</h1>
            <p className="text-gray-400 mb-4">Por favor recarga la página</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const Rap = lazy(() => import('./pages/Rap'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contacts = lazy(() => import('./pages/Contacts'))
const Minstitucional = lazy(() => import('./pages/organic/Minstitucional'))
const Instructors = lazy(() => import('./pages/organic/Instructors'))
const Brigs = lazy(() => import('./pages/organic/brigs'))
const Comandantes = lazy(() => import('./pages/organic/comandantes'))
const Ethic = lazy(() => import('./pages/identity/Ethic'))
const Map = lazy(() => import('./pages/identity/Map'))
const Simbolismos = lazy(() => import('./pages/identity/Simbolismos'))
const Historia = lazy(() => import('./pages/identity/Historia'))
const Biblioteca = lazy(() => import('./pages/Biblioteca'))
const Politicos = lazy(() => import('./pages/organic/politic'))
const Cupula = lazy(() => import('./pages/organic/Cupula'))



// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

function App() {
  return (

  <ErrorBoundary>
    <BrowserRouter>
      <Suspense>
        <Routes>
          <ScrollToTop />
            {/* Págins principales */}
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='rap' element={<Rap />} />
            <Route path='values' element={<Ethic />} />
            <Route path='gallery' element={<Gallery />} />
            <Route path='contacts' element={<Contacts />} />


            {/* Páginas del organico */}
            <Route path='/organic/politicos' element={<Politicos />} />
            <Route path='/organic/minstitucional' element={<Minstitucional />} />
            <Route path='/organic/cupula' element={<Cupula />} />
            <Route path='/organic/instructors' element={<Instructors />} />
            <Route path='/organic/brigs' element={<Brigs />} />
            <Route path='/organic/comandantes' element={<Comandantes />} />

            {/* Páginas de Identidad */}
            <Route path='/identity/values' element={<Ethic />} />
            <Route path='/identity/structure' element={<Map />} />
            <Route path='/identity/simbolismos' element={<Simbolismos />} />
            <Route path='/identity/historia' element={<Historia />} />
            <Route path='/identidad/historia' element={<Historia />} />

            <Route path='/library/regulations' element={<Biblioteca />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
