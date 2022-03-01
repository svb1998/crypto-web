import React from 'react';
import './Card.css'

const Card = ({ icon, coinName, ticker, price, marketCap, ranking }) => {

    function handleStyle() {
        if (coinName.length > 20) {
            return { 'fontSize': 28 }
        }
        else return {}
    }

    return (
        <div className='card-container'>
            <div className='coin-icon-container'>
                <img className='coin-icon' src={icon} alt="btc-icon" />
            </div>
            <div className='coin-info'>
                <span className='coin-nombre' style={coinName.length > 10 ? { fontSize: "160%" } : { fontSize: 33 }}>{coinName} ({ticker})</span>
                <span className='coin-precio'>{price}</span>
                <span >Market Cap: <span className='coin-market-cap'> {marketCap}</span></span>
            </div>
            <div className='coin-ranking'>
                #{ranking}
            </div>
        </div >
    );
};

export default Card;