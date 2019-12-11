import React, {useState, useEffect}  from 'react'
import { buyIn} from '../../logic'
import { parse } from 'path'


export default function ({userId, companyId, stockId}) {

    // const [, ] = useState()

    async function handleBuyIn(userId, companyId, stockId, operation, quantity){

        try { debugger

            buyIn(userId, companyId, stockId, operation, quantity)

        } catch({message}) {

            console.log(message)

        }
    }

    return <div className="boxes-buy buy">
    <span className="buy-text">How many would you like to buy ?</span>
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
        <form className="search-formula formula" onSubmit={
            function(event){ debugger

                event.preventDefault()
                const {quantity: {value:quantity}} = event.target
                const operation = 'buy-in'
                const numberQuantity = parseInt(quantity)
                handleBuyIn (userId, companyId, stockId, operation, numberQuantity)
                
            }
        }>
            <input className="formula-container" type="number"  name="quantity"  placeholder="How many" min="1"/>

            <button className="formula-btn">Pick stock</button>
        </form>

        <p className="search-warning">Enter value between $1 - $200</p>
        </div>
    </div> 
}