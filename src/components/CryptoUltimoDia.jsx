import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Crypto.css'
import { Link } from 'react-router-dom'
import './CryptoUltimoDia.css'
const CryptoUltimoDia = () => {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroNombre, setFiltroNombre] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
          },
        })
        setCryptos(response.data)
      } catch (err) {
        setError('Error al obtener datos de CoinGecko')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const criptosFiltrados = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(filtroNombre.toLowerCase())
  )

  const criptosOrdenadas = [...criptosFiltrados].sort(
    (a, b) => b.current_price - a.current_price
  )

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">📊 Cambio de Valor en las Últimas 24 Horas</h2>

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <input
                type="text"
                placeholder="🔍 Filtrar por nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                className="form-control mb-4"
              />
              <div className="table-crypto">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Nombre</th>
                      <th>Símbolo</th>
                      <th>Precio (USD)</th>
                      <th>Cambio 24h (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criptosOrdenadas.map((crypto) => {
                      const cambio24h = crypto.price_change_percentage_24h;
                      const rowClass = cambio24h > 0 ? 'crypto-row-up' : 'crypto-row-down';
                      const flecha = cambio24h > 0 ? '↑' : '↓';

                      return (
                        <tr key={crypto.id} className={rowClass}>
                          <td>
                            <Link to={`/detalle/${crypto.id}`} className="text-decoration-none">
                              {crypto.name}
                            </Link>
                          </td>
                          <td>{crypto.symbol.toUpperCase()}</td>
                          <td>${crypto.current_price.toLocaleString()}</td>
                          <td>
                            {flecha} {Math.abs(cambio24h).toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CryptoUltimoDia
