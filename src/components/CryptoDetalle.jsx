import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './CryptoDetalleInfo.css'

const CryptoDetalle = () => {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroNombre, setFiltroNombre] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list')
        setCryptos(response.data)
      } catch (err) {
        setError('Error al obtener lista de criptomonedas')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtradas = cryptos.filter((c) =>
    c.name.toLowerCase().includes(filtroNombre.toLowerCase()) ||
    c.symbol.toLowerCase().includes(filtroNombre.toLowerCase())
  )

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">📋 Listado de Criptomonedas</h2>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Filtrar por nombre o símbolo"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />

          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {!loading && !error && (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <ul className="list-group">
                {filtradas.map((c) => (
                  <li key={c.id} className="list-group-item">
                    <Link to={`/detalle/${c.id}`} className="text-decoration-none">
                      {c.name} ({c.symbol.toUpperCase()})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CryptoDetalle
