import React from 'react'
import Company from '../Company'

export default function ({ companies }) { debugger
    return <ul className="button-list list">
        {companies.map(company => <li className="list-stock stock" key={company.id}><Company company={company} /></li>)}
    </ul>
}