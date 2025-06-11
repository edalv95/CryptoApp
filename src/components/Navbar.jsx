import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">CryptoApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/topcriptomonedas">Top</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ultimas-24h">Cambio en 24h</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/buscar">Buscar Crypto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/detalle">Detalle de Cryptos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/grafico">Gráfico de Precios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/volatilidad">Volatilidad</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comparar">Comparación valor/moneda</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
