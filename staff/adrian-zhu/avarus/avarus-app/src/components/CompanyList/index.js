import React from 'react'
import Company from '../Company'

export default function ({ companies, userId }) { 
    return <ul className="button-list list">
        {companies.map(company => <li className="list-stock stock" key={company.id}><Company company={company} userId={userId}/></li>)}
    </ul>
}