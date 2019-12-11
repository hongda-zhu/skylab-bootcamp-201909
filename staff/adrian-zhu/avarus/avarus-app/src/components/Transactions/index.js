import React, {useState, useEffect} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import {retrieveUser} from '../../logic'
import TransactionsItem from '../TransactionsItem'


function Transactions ({userId, transactions, error, onClose }) { 

    console.log(transactions)
    debugger

    

    return <section className="transactions">

    <span className="transactions-span">Aquí son transaciones</span>

    {transactions &&  <ul className="button-list list">
        {transactions.map(transaction => <li className="list-stock stock" key={transaction.id}><TransactionsItem transaction={transaction} /></li>)}
    </ul>}

    {error && < Feedback message={error} onClose={onClose}/>}

</section> 
} 

export default withRouter(Transactions)