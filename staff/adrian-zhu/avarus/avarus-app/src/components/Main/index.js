import React, {useState, useEffect} from 'react'
import './index.sass'
import {withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import Search from '../Search'
import {retrieveCompanies, retrieveCompanyByName, retrieveCompanyByCategory, retrieveUser} from '../../logic'
import { set } from 'mongoose'


function Main ({error, onClose, userId }) { 

    const [companies, setCompanies] = useState([])
    
    const [user, setUser] = useState()

    const {token} = sessionStorage

    useEffect(()=>{

        (async()=>{

            try{

                // const {id:userId} = await retrieveUser(token)

                // handleSearchAll(userId, token)

                const userInformation = await retrieveUser(token)

                setUser(userInformation)

                handleSearchAll(userInformation.id, token)
                

            }catch(message){

                console.log(`${message}`)

            }

        })()
        
    }, [])



    async function handleSearchAll(userId, token){

        try { 
            
            const companies = await retrieveCompanies(userId, token)
                    
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
    
    <Search handleNameQuery={handleSearchName} handleCategoryQuery={handleCategoryQuery} companies={companies}  message={error} onClose={onClose} user={user}/>

    {error && < Feedback message={error} onClose={onClose}/>}

</main>
}

export default withRouter(Main)