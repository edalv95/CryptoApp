import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Crypto from './components/Crypto'
import CryptoUltimoDia from './components/CryptoUltimoDia'
import CryptoPorNombre from './components/CryptoPorNombre'
import CryptoDetalle from './components/CryptoDetalle'
import CryptoDetalleInfo from './components/CryptoDetalleInfo'
import CryptoGrafico from './components/CryptoGrafico'
import CryptoVolatilidad from './components/CryptoVolatilidad'
import CryptoComparar from './components/CryptoComparar'

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/topcriptomonedas" element={<Crypto />} />
          <Route path="/ultimas-24h" element={<CryptoUltimoDia />} />
          <Route path="/buscar" element={<CryptoPorNombre />} />
          <Route path="/detalle" element={<CryptoDetalle />} />
          <Route path="/detalle/:id" element={<CryptoDetalleInfo />} />
          <Route path="/grafico" element={<CryptoGrafico />} />
          <Route path="/volatilidad" element={<CryptoVolatilidad />} />
          <Route path="/comparar" element={<CryptoComparar />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
