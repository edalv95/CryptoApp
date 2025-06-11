import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Crypto.css'

const CryptoVolatilidad = () => {
  const [masVolatil, setMasVolatil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
              price_change_percentage: '24h'
            }
          }
        )

        const data = response.data

        const masVolatil = data.reduce((prev, current) => {
          const prevVol = Math.abs(prev.price_change_percentage_24h || 0)
          const currVol = Math.abs(current.price_change_percentage_24h || 0)
          return currVol > prevVol ? current : prev
        })

        setMasVolatil(masVolatil)
      } catch (err) {
        setError('Error al obtener datos de CoinGecko')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body text-center">
          <h2 className="card-title mb-4">🚀 Criptomoneda más volátil (últimas 24h)</h2>

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && masVolatil && (
            <>
              <h3>{masVolatil.name} ({masVolatil.symbol.toUpperCase()})</h3>
              <img src={masVolatil.image} alt={masVolatil.name} className="my-3" />
              <p><strong>Precio actual:</strong> ${masVolatil.current_price.toLocaleString()}</p>
              <p><strong>Variación 24h:</strong> <span className={masVolatil.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                {masVolatil.price_change_percentage_24h.toFixed(2)}%
              </span></p>
              <p><strong>Market Cap:</strong> ${masVolatil.market_cap.toLocaleString()}</p>
              <p><strong>Volumen 24h:</strong> ${masVolatil.total_volume.toLocaleString()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CryptoVolatilidad
