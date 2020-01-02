import React from 'react'
import Company from '../Company'

<<<<<<< HEAD
export default function ({ companies, token }) { 
=======
export default function ({ companies, userId }) { 
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343
    
    return <ul className="button-list list">
        {companies.map(company => <li className="list-stock stock" key={company.name}><Company company={company} token={token}/></li>)}
    </ul>
}