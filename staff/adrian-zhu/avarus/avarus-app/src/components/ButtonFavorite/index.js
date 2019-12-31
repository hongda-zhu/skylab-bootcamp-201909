 
import React, { useState, useEffect }  from 'react'
import {toggleFav, retrieveCompanyById} from '../../logic'


export default function ({userId, companyId}) {
    const [company, setCompany] = useState({})
   
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
           
                
                const updatedUser = await retrieveCompanyById(companyId, userId)
                
                setCompany(updatedUser)

            
         } catch ({message}) {
             console.log(message)
         }
    }

    async function onFav(){
        try {

            debugger
           
            await toggleFav(userId, companyId)    
            await refreshUserFav()
           
        } catch ({message}) {
            console.log(message)

            
        }
    }


    return  <>
               
               { company && (company.isFav ? 
                    <button className="btn-fav" onClick={onFav}><i className="fas fa-heart"></i></button> :
                    <button className="btn-fav" onClick={onFav}><i className="far fa-heart"></i></button>)
                }
                
            </>
           
}