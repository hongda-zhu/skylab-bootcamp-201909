import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
const moment = require('moment')


export default withRouter(function ({ history, transaction, goToDetail }) {  

    const {amount, company, time} = transaction

    let exactTime = moment(time).format("DD/MM/YY hh:mm")
    const {name} = company 
    let ajustedAmount = amount.toFixed(5) 

    function goToDetail() { 
        if(!transaction.id) transaction.id = transaction._id

        history.push(`/detailTransactions/${transaction.id }`)
        
    }

    return <a className="transactions-items items" onClick = {function (event){
        event.preventDefault()
        goToDetail()
    }}>
        {/* <img src={image} className="items-img"></img> */}
        <h3 className="items-time">{exactTime}</h3>
        <p className="items-name">{name}</p>
        <p className="items-amount">{ajustedAmount}</p>
    </a>
})