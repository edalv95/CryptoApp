import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartDataLabels
)

const CryptoGrafico = () => {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const chartRefs = useRef([])

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 5,
            sparkline: true
          }
        })
        setCryptos(res.data)
      } catch (err) {
        setError('No se pudo obtener información de CoinGecko.')
      } finally {
        setLoading(false)
      }
    }

    fetchCryptos()
  }, [])

  chartRefs.current = cryptos.map((_, i) => chartRefs.current[i] || React.createRef())

  const barData = {
    labels: cryptos.map(c => c.name),
    datasets: [
      {
        label: 'Precio Actual (USD)',
        data: cryptos.map(c => c.current_price),
        backgroundColor: '#C87800'
      }
    ]
  }

 const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      ticks: {
        color: '#c7c6c6'
      }
    },
    y: {
      ticks: {
        color: '#c7c6c6'
      }
    }
  }
}

  const getMiniLineOptions = (crypto) => {
    const prices = crypto.sparkline_in_7d.price
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const mid = (min + max) / 2

    return {
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
          suggestedMin: min,
          suggestedMax: max,
          ticks: {
            callback: (value) => `$${value}`,
            color: '#c7c6c6',
            font: { size: 9 },
            maxTicksLimit: 3,
            stepSize: Math.round((max - min) / 2)
          },
          grid: {
            drawTicks: false,
            color: '#eee'
          }
        }
      },
      elements: {
        point: { radius: 2 },
        line: { tension: 0.2 }
      }
    }
  }

  const handleChartClick = (event, chartRef, crypto) => {
    if (!chartRef.current) return
    const chart = chartRef.current
    const elements = chart.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, false)
    if (!elements.length) return

    const index = elements[0].index
    const precio = crypto.sparkline_in_7d.price[index]
    alert(`🪙 ${crypto.name}\n📅 Día ${index + 1} de los últimos 7\n💲 $${precio.toFixed(2)}`)
  }

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">📊 Precio Actual de las Principales Criptomonedas</h3>
      <div className="card shadow mb-5">
        <div className="card-body">
          {loading && <div className="text-center">Cargando...</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}
          {!loading && !error && <Bar data={barData} options={barOptions} />}
        </div>
      </div>

      <h4 className="text-center mb-3">📈 Evolución de Precio (últimos 7 días)</h4>
      <div className="row">
        {cryptos.map((crypto, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={crypto.id}>
            <div className="card h-100">
              <div className="card-body text-center">
                <h6>{crypto.name}</h6>
                <Line
                  ref={chartRefs.current[index]}
                  data={{
                    labels: crypto.sparkline_in_7d.price.map((_, i) => i),
                    datasets: [
                      {
                        data: crypto.sparkline_in_7d.price,
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 2,
                        fill: false
                      }
                    ]
                  }}
                  options={getMiniLineOptions(crypto)}
                  onClick={(event) =>
                    handleChartClick(event, chartRefs.current[index], crypto)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CryptoGrafico
