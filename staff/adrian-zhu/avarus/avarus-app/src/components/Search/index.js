import React, {useEffect, useState} from 'react'
import './index.sass'
// import CompanyList from '../CompanyList'
// import {retrieveCompanyByName} from '../../logic'
import Company from '../Company'

export default (function ({ handleNameQuery, companies}) {

    async function handleSubmitSearch (event) {

        event.preventDefault()
        
        const {query: {value: query}} = event.target

        handleNameQuery(query)
    
    }

    return <form type="submit" className="main-search" onSubmit={handleSubmitSearch}>

        <div>

        <input className="main-search__text" name="query" placeholder="search" />
        <button className="main-search__btn" type="submit"><i className="fas fa-search"></i></button> 

        </div>

        {companies && <Company company={companies} />}

    </form>
   
})
