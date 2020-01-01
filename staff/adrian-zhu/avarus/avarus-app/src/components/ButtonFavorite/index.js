import React, { useState, useEffect }  from 'react'
import {toggleFav, retrieveCompanyById} from '../../logic'
import './index.sass'


export default function ({userId, companyId}) {
    const [company, setCompany] = useState({})
    const {token} = sessionStorage
   
    useEffect(() => {
        (async () => {
            try {
                await refreshUserFav()
            } catch ({message}) {
                console.log(message)
            }
        })()
    }, [])

    async function refreshUserFav(){
        
        try {
           
                
                const updateCompany = await retrieveCompanyById(companyId, userId)

                debugger
                
                setCompany(updateCompany)

            
         } catch ({message}) {
             console.log(message)
         }
    }

    async function onFav(event){
        try {

            event.preventDefault()

            await toggleFav(token, companyId) 
            debugger   
            await refreshUserFav()

        } catch ({message}) {
            console.log(message)

            
        }
    }

    return  <>
               
               { company && (company.isFav ? 
                    <button className="btn-fav" onClick={onFav}><i className="fas fa-money-bill-alt"></i></button> :
                    <button className="btn-fav" onClick={onFav}><i className="far fa-money-bill-alt"></i></button>)
                }
                
            </>
           
}