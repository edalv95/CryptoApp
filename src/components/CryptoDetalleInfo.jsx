import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

// ✅ No registres chartjs-plugin-datalabels aquí
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const CryptoDetalleInfo = () => {
  const { id } = useParams()
  const [crypto, setCrypto] = useState(null)
  const [sparkline, setSparkline] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
          params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
          },
        })
        setCrypto(response.data)

        const marketResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: id,
            sparkline: true
          }
        })

        const sparkData = marketResponse.data[0]?.sparkline_in_7d?.price
        if (sparkData) setSparkline(sparkData)

      } catch (err) {
        setError('Error al obtener los datos de la criptomoneda')
      } finally {
        setLoading(false)
      }
    }

    fetchDetalle()
  }, [id])

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-3">{error}</div>
  }

  const chartData = {
    labels: sparkline?.map((_, i) => i),
    datasets: [
      {
        data: sparkline,
        borderColor: 'rgba(0, 200, 200, 0.8)',
        backgroundColor: 'rgba(0, 200, 200, 0.1)',
        pointRadius: 2,
        fill: true,
        tension: 0.3
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false }
    },
    scales: {
      x: { display: false },
      y: {
        display: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          color: '#666',
          font: { size: 10 },
          maxTicksLimit: 3
        },
        grid: { color: '#eee' }
      }
    },
    elements: {
      point: { radius: 2 },
      line: { tension: 0.2 }
    }
  }

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body text-center">
          <h2 className="text-primary">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
          <img src={crypto.image.large} alt={crypto.name} className="my-3" />
          <p><strong>Precio actual:</strong> ${crypto.market_data.current_price.usd.toLocaleString()}</p>
          <p><strong>Market Cap:</strong> ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
          <p><strong>Volumen 24h:</strong> ${crypto.market_data.total_volume.usd.toLocaleString()}</p>
          <p><strong>Ranking de mercado:</strong> #{crypto.market_cap_rank}</p>

          {sparkline && (
            <div className="mt-4">
              <h5 className="mb-3">📉 Evolución últimos 7 días</h5>
              <div className="d-flex justify-content-center">
                <div style={{ width: '300px' }}>
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CryptoDetalleInfo
