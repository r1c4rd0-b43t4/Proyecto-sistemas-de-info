import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import { DatosRuta } from './components/DatosRuta.jsx'
import { TarjetaRuta } from './components/TarjetaRuta.jsx'
import {DescubreRutas} from './components/DescubreRutas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DescubreRutas/>
  </StrictMode>,
)
