import React, {useState} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import Category from '../Category'
import {retrieveCompanyByName, retrieveCompanyByCategory} from '../../logic'


function Main ({error, onClose }) { 

    const [companies, setCompanies] = useState()

    const [companiesName, setCompaniesName] = useState()

    async function handleSearchName(query) {
      
        const companiesName = await retrieveCompanyByName(query)

        setCompaniesName(companiesName)

    }

    async function handleCategoryQuery(Category) {
      
        const companies = await retrieveCompanyByCategory(Category)

        setCompanies(companies)
  
    }

    return  <main className="main">

    <span className="main-span">Choose the stocks you'd like to give</span>

                                                            
    <Search handleNameQuery={handleSearchName} companies={companiesName}/> 
    
    <Category handleCategoryQuery={handleCategoryQuery} companies={companies}/>

    {error && < Feedback message={error} onClose={onClose}/>}

</main>
}

export default withRouter(Main)