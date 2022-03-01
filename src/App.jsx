import React, { useState, useEffect } from 'react';
import './App.css';
import Searcher from './components/Searcher';
import Card from './components/Card';

import moonIcon from './assets/moon-icon.svg'
import earthIcon from './assets/earth-icon.svg'


const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'


function App() {

  const [coins, setCoins] = useState([])
  const [filteredCoins, setFilteredCoins] = useState([])

  const [showTopTen, setShowTopTen] = useState(true)

  const handleFilter = (e) => {
    const searchWord = e.target.value
    console.log(searchWord)
    if (searchWord.length === 0) {
      setShowTopTen(true)
      setFilteredCoins(coins.slice(0, 10))

    }
    else {
      setShowTopTen(false)
      const newFilter = coins.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.symbol.toLowerCase().includes(searchWord.toLowerCase())
      })
      setFilteredCoins(newFilter)
    }




  }

  const handleFocus = (e) => {
    if (e.target.value.length < 1) {
      setShowTopTen(true)
    }
    else {
      setShowTopTen(false)
    }
  }

  useEffect(() => {

    try {
      fetch(url).then(
        response => response.json()
      ).then(
        data => {
          setCoins(data)
        }
      )
    } catch (e) {
      console.log(e)
    }
  }, [])

  function mapData(data) {
    return data.map((coin, key) => (

      < Card
        icon={coin.image}
        coinName={coin.name}
        ticker={coin.symbol.toUpperCase()}
        price={coin.current_price.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}
        marketCap={coin.market_cap.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}
        ranking={coin.market_cap_rank}
      />
    ))
  }

  return (
    <div className="App">
      <div className='main-section'>
        <img className='moon-img' src={moonIcon} alt="moon" />
        {/* <img className='rocket-img' src={rocketIcon} alt="rocket" /> */}
        <Searcher
          handleFilter={handleFilter}
          handleFocus={handleFocus}
        />

        {showTopTen == true && <h1 className='title-h1'>TOP 25</h1>}
        {showTopTen == true && mapData(coins.slice(0, 25))}
        {showTopTen == false && filteredCoins.length < 1 && <h1 className='text-neon' >No hemos encontrado nada 👎🏻</h1>}


        {showTopTen == false && filteredCoins.length > 0 && mapData(filteredCoins)}
      </div>

      <div className='earth-container'>
        <img className='earth-img' src={earthIcon} alt="earth" />
      </div>

    </div>
  );
}

export default App;
