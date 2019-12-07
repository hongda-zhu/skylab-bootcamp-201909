import React, {useState} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import Category from '../Category'
import {retrieveCompanyByName, retrieveCompanyByCategory} from '../../logic'


function Main ({error, onClose }) { 

    const [companiesCategory, setCompaniesCategory] = useState([])

    const [companiesName, setCompaniesName] = useState()

    async function handleSearchName(query) {
      
        const companiesName = await retrieveCompanyByName(query)

        setCompaniesName(companiesName)

    }

    async function handleCategoryQuery(categoryType) {
      
        const companiesCategory = await retrieveCompanyByCategory(categoryType)

        setCompaniesCategory(companiesCategory)
        
  
    }

    return  <main className="main">

    <span className="main-span">Choose the stocks you'd like to give</span>

                                                            
    <Search handleNameQuery={handleSearchName} companies={companiesName} message={error} onClose={onClose}/> 
    
    <Category handleCategoryQuery={handleCategoryQuery} companies={companiesCategory}  message={error} onClose={onClose}/>

    {error && < Feedback message={error} onClose={onClose}/>}

</main>
}

export default withRouter(Main)