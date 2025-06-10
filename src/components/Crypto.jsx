import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Crypto.css'

const Crypto = () => {
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

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">📈 Top 10 Criptomonedas</h2>

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

              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Nombre</th>
                      <th>Símbolo</th>
                      <th>Precio (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criptosFiltrados.map((crypto) => (
                      <tr key={crypto.id}>
                        <td>{crypto.name}</td>
                        <td>{crypto.symbol.toUpperCase()}</td>
                        <td>${crypto.current_price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Crypto
