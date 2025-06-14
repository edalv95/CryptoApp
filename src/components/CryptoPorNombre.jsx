import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'
import './Crypto.css'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)
import './CryptoPorNombre.css'

const CryptoPorNombre = () => {
  const [input, setInput] = useState('')
  const [crypto, setCrypto] = useState(null)
  const [sparkline, setSparkline] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const buscarCripto = async () => {
    setLoading(true)
    setError(null)
    setCrypto(null)
    setSparkline(null)

    try {
      const listaResponse = await axios.get('https://api.coingecko.com/api/v3/coins/list')
      const lista = listaResponse.data

      const match = lista.find(
        (coin) =>
          coin.id.toLowerCase() === input.toLowerCase() ||
          coin.symbol.toLowerCase() === input.toLowerCase() ||
          coin.name.toLowerCase() === input.toLowerCase()
      )

      if (!match) {
        setError('No se encontró una criptomoneda con ese nombre o símbolo.')
        setLoading(false)
        return
      }

      const detalleResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${match.id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      })
      setCrypto(detalleResponse.data)

      const sparklineResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: match.id,
          sparkline: true
        }
      })

      const sparkData = sparklineResponse.data[0]?.sparkline_in_7d?.price
      if (sparkData) setSparkline(sparkData)

    } catch (err) {
      setError('Error al consultar la API de CoinGecko')
    } finally {
      setLoading(false)
    }
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
        <div className="card-searchbar">
          <h2 className="card-title text-center mb-4">🔍 Buscar Criptomoneda por Nombre</h2>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ej: bitcoin, btc, ethereum"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={buscarCripto}
            />
            <i class="icon-search-new UniversalField_searchIcon__FU8To"></i>
            <button className="btn btn-primary" onClick={buscarCripto} onKeyDown={buscarCripto}>
              Buscar
            </button>
          </div>

          {loading && (
            <div className="text-center my-3">
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

          {crypto && (
          <div className="result-body">
          <div className="text-center mt-4">
            <h2 className="text-primary">
              <Link to={`/detalle/${crypto.id}`} className="crypto-link">
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </Link>
            </h2>
            <Link to={`/detalle/${crypto.id}`} className="crypto-link">
              <img src={crypto.image.large} alt={crypto.name} className="my-3" />
            </Link>
            <p><strong>Precio actual:</strong> ${crypto.market_data.current_price.usd.toLocaleString()}</p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CryptoPorNombre
