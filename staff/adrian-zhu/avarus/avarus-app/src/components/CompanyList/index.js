import React from 'react'
import Company from '../Company'

export default function ({ companies, user }) { 
    return <ul className="button-list list">
        {companies.map(company => <li className="list-stock stock" key={company.id}><Company company={company} user={user}/></li>)}
    </ul>
}