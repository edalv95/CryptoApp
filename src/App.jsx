import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Crypto from './components/Crypto'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/topcriptomonedas" element={<Crypto />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
