import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Crypto.css'

const Crypto = () => {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h1 className='crypto-title'>Top 10 Criptomonedas</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Símbolo</th>
            <th>Precio (USD)</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>${crypto.current_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Crypto
