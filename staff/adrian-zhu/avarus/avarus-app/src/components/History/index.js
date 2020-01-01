import React, {useState, useEffect} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import {retrieveUser} from '../../logic'
import HistoryItems from '../HistoryItems'


function History ({sellRegisters, error, onClose }) { 

    return <section className="sellRegisters">

    <span className="sellRegisters-span">Sales</span>

        {sellRegisters.length > 0 ?  <ul className="sellRegisters-lists lists">
            {sellRegisters.map(sellRegister => <li className="lists-sellRegister" key={sellRegister.id}><HistoryItems sellRegister={sellRegister} /></li>)}
        </ul>: <p className="lists-sellRegister">There has not sales register related</p>}

        {error && < Feedback message={error} onClose={onClose}/>}

    </section> 
} 

export default withRouter(History)
