import React, {useState, useEffect} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import {retrieveCompanies, retrieveCompanyByName, retrieveCompanyByCategory} from '../../logic'


function Main ({error, onClose }) { 

    const [companies, setCompanies] = useState([])

    const {token} = sessionStorage

    // const [companiesName, setCompaniesName] = useState()

    // (function(){
    // })()

    useEffect(()=>{

        (async()=>{

            try{

                const companies = await retrieveCompanies(token)

                setCompanies(companies)

            }catch(message){
                console.log('Cabron')
            }

        })()
        
    }, [token])

    async function handleSearchName(query) {
      
        const companies = await retrieveCompanyByName(query)

        setCompanies(companies)

    }

    async function handleCategoryQuery(categoryType) {
      
        const companies = await retrieveCompanyByCategory(categoryType)

        setCompanies(companies)
    
    }

    return  <main className="main">

    <span className="main-span">Choose the stocks you'd like to give</span>
    
    <Search handleNameQuery={handleSearchName} handleCategoryQuery={handleCategoryQuery} companies={companies}  message={error} onClose={onClose}/>

    {/* {companies && < CompanyList companies={companies}/>} */}

    {error && < Feedback message={error} onClose={onClose}/>}

</main>
}

export default withRouter(Main)