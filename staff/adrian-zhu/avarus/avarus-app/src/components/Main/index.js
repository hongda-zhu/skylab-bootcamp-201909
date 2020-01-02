import React, {useState, useEffect} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import {retrieveCompanies, retrieveCompanyByName, retrieveCompanyByCategory} from '../../logic'

function Main ({error, onClose, token }) { 

    const [companies, setCompanies] = useState([])
<<<<<<< HEAD
    
    // const [user, setUser] = useState()
=======

    const [user, setUser] = useState()

    const {token} = sessionStorage
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343

    useEffect(()=>{

        (async()=>{

            try{

                handleSearchAll(token)
                

            }catch(message){

                console.log(`${message}`)

            }

        })()
        
    }, [])



    async function handleSearchAll(token){

        try { 
<<<<<<< HEAD
            
            const companies = await retrieveCompanies(token)
=======
 
            const companies = await retrieveCompanies(userId, token)
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343
                    
            setCompanies(companies)

        }catch({message}){
            
            console.log(`${message}`)

        }

    }

    async function handleSearchName(query, token) {

        try { 

            const companies = await retrieveCompanyByName(query, token)
    
            setCompanies(companies)

        }catch({message}){
            
            console.log(`${message}`)

        }

    }

    async function handleCategoryQuery(categoryType, token) {

        try {

            const companies = await retrieveCompanyByCategory(categoryType, token)
    
            setCompanies(companies)

        }catch({message}){
            
            console.log(`${message}`)

        }

    }

    return  <main className="main">

    <span className="main-span">Choose the stocks you'd like to give</span>
    
    <Search handleNameQuery={handleSearchName} handleCategoryQuery={handleCategoryQuery} companies={companies}  message={error} onClose={onClose} token={token}/>

    {error && < Feedback message={error} onClose={onClose}/>}

</main>
}

export default withRouter(Main)