import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Crypto.css'
const CryptoComparar = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const criptos = [
    'bitcoin',
    'ethereum',
    'dogecoin',
    'solana',
    'cardano',
    'tron',
    'litecoin',
    'polkadot',
    'chainlink'
  ]

  const monedas = [
    { code: 'usd', label: 'USD', symbol: '$' },
    { code: 'eur', label: 'EUR', symbol: '€' },
    { code: 'gbp', label: 'GBP', symbol: '£' },
    { code: 'jpy', label: 'JPY', symbol: '¥' },
    { code: 'brl', label: 'BRL', symbol: 'R$' }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ids = criptos.join(',')
        const vs = monedas.map((m) => m.code).join(',')
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids,
            vs_currencies: vs
          }
        })
        setData(response.data)
      } catch (err) {
        setError('No se pudo obtener información de precios.')
      }
    }

    fetchData()
  }, [])

  const mostrarPrecio = (cryptoId, monedaCode, symbol) => {
    const valor = data?.[cryptoId]?.[monedaCode]
    return valor !== undefined ? `${symbol}${valor.toLocaleString()}` : 'N/D'
  }

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">🌍 Comparar Precios en Múltiples Monedas</h2>

          {error && <div className="alert alert-danger text-center">{error}</div>}

          {data && (
            <div className="table-crypto">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Criptomoneda</th>
                    {monedas.map((m) => (
                      <th key={m.code}>{m.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criptos.map((id) => (
                    <tr key={id}>
                      <td>
                        <Link to={`/detalle/${id}`} className="text-decoration-none">
                          {id.charAt(0).toUpperCase() + id.slice(1)}
                        </Link>
                      </td>
                      {monedas.map((m) => (
                        <td key={m.code}>{mostrarPrecio(id, m.code, m.symbol)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CryptoComparar
