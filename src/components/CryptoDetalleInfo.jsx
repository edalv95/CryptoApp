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
import './CryptoDetalleInfo.css'

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

const horasPorDia = 24
const diasAMostrar = 7

let dailyPrices = []
let dailyLabels = []

if (sparkline && sparkline.length >= horasPorDia * diasAMostrar) {
  for (let i = 0; i < diasAMostrar; i++) {
    dailyPrices.push(sparkline[i * horasPorDia])
    const date = new Date(Date.now() - (diasAMostrar - 1 - i) * 24 * 60 * 60 * 1000)
    dailyLabels.push(date.toLocaleDateString('es-ES', { weekday: 'short' }))
  }
}

const chartData = {
  labels: dailyLabels,
  datasets: [
    {
      data: dailyPrices,
      borderColor: 'rgba(200, 120, 0, 0.84)',
      backgroundColor: 'rgba(236, 10, 10, 0.1)',
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
    x: { 
      display: true,
      title: { display: true, text: 'Día' },
      ticks: { color: '#b0b0b0' }
    },
    y: {
      display: true,
      ticks: {
        callback: (value) => `$${value.toLocaleString()}`,
        color: '#b0b0b0',
        font: { size: 15 },
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
  <div className="crypto-detalle-layout">
    <div className="crypto-info-columns">
      <div className="info-col">
        <div className="crypto-header">
          <img src={crypto.image.large} alt={crypto.name} className="crypto-logo" />
          <h2 className="crypto-name">
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </h2>
        </div>
        <div className="info-box">
          <strong>Ranking de mercado:</strong> #{crypto.market_cap_rank}
        </div>
      </div>
      <div className="info-col">
      <div className="info-box">
        <div className="info-title">Precio actual:</div>
        <div className="info-data">${crypto.market_data.current_price.usd.toLocaleString()}</div>
      </div>
      <div className="info-box">
        <div className="info-title">Market Cap:</div>
        <div className="info-data">${crypto.market_data.market_cap.usd.toLocaleString()}</div>
      </div>
      <div className="info-box">
        <div className="info-title">Volumen 24h:</div>
        <div className="info-data">${crypto.market_data.total_volume.usd.toLocaleString()}</div>
      </div>
      </div>
    </div>
    <div className="crypto-graph-center">
      {sparkline && (
        <div className="graph-box">
          <h5 className="mb-3 text-center">Evolución en los últimos 7 días</h5>
        <div className="graph-inner" style={{ width: '800px', height: '500px' }}>
          <Line data={chartData} options={chartOptions} width={700} height={400} />
        </div>
        </div>
      )}
    </div>
  </div>
)
}



export default CryptoDetalleInfo
