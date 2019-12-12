import React, {useState, useEffect} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import {retrieveUser} from '../../logic'
import TransactionsItem from '../TransactionsItem'


function Transactions ({userId, transactions, error, onClose }) { 

    return <section className="transactions">

    <span className="transactions-span">Aquí son transaciones</span>

    {transactions &&  <ul className="transactions-lists lists">
        {transactions.map(transaction => <li className="lists-transaction" key={transaction.id}><TransactionsItem transaction={transaction} /></li>)}
    </ul>}

    {error && < Feedback message={error} onClose={onClose}/>}

</section> 
} 

export default withRouter(Transactions)