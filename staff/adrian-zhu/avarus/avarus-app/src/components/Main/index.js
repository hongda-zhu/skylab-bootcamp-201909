import React, {useState, useEffect} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import {retrieveCompanies, retrieveCompanyByName, retrieveCompanyByCategory, producePrice} from '../../logic'


function Main ({error, onClose }) { 

    const [companies, setCompanies] = useState([])

    const {token} = sessionStorage

    // const {error, setError} = useState()

    useEffect(()=>{

        (async()=>{

            try{

                console.log(companies)

                handleSearchAll()
                // producePrice()

            }catch(message){

                console.log(`${message}`)

            }

        })()
        
    }, [])



    async function handleSearchAll(){

        try {
            
            const companies = await retrieveCompanies(token)
                    
            setCompanies(companies)

        }catch({message}){
            
            console.log(`${message}`)

        }

    }

    async function handleSearchName(query) {

        try {

            const companies = await retrieveCompanyByName(query)
    
            setCompanies(companies)

        }catch({message}){
            
            console.log(`${message}`)

        }

    }

    async function handleCategoryQuery(categoryType) {

        try {

            const companies = await retrieveCompanyByCategory(categoryType)
    
            setCompanies(companies)

        }catch({message}){
            
            console.log(`${message}`)

        }

    }

    return  <main className="main">

    <span className="main-span">Choose the stocks you'd like to give</span>
    
    <Search handleNameQuery={handleSearchName} handleCategoryQuery={handleCategoryQuery} companies={companies}  message={error} onClose={onClose}/>

    {error && < Feedback message={error} onClose={onClose}/>}

</main>
}

export default withRouter(Main)