import React from 'react'

export default function ({}) {
    return <div className="container-buy buy">
    <span className="buy-text">How much would you like to buy ?</span>
    <div className="buy-prices prices">
        <ul className="prices-list list">
            <li className="list-price price">
                <button className="price-btn">
                    $25
                </button>
            </li>
            <li className="list-price price">
                <button className="price-btn">
                    $50
                </button>
            </li>
            <li className="list-price price">
                <button className="price-btn">
                    $100
                </button>
            </li>
            <li className="list-price price">
                <button className="price-btn">
                    $200
                </button>
            </li>
        </ul>
    </div>
    
    <div type="submit" className="buy-search search">
        <form className="search-formula formula">
            <input className="formula-container" name="query" placeholder="How much" />

            <button className="formula-btn">Pick stock</button>
        </form>
        <p className="search-warning">Enter value between $1 - $200</p>
        </div>
    </div> 
}