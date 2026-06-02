import { useState } from 'react'

import Navbar from './components/Navbar'
import FilterBar from './components/FilterBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <FilterBar />
    </>
  )
}

export default App
