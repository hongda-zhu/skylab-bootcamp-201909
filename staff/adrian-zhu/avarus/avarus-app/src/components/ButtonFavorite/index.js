import React, { useState, useEffect }  from 'react'
import {toggleFav, retrieveCompanyById} from '../../logic'


export default function ({userId, companyId}) {
    const [company, setCompany] = useState({})

    debugger
   
    useEffect(()=>{
        (async () => {
            try {
                
                await refreshUserFav()
            } catch ({message}) {
                console.log(message)
            }
        })()
    })


    async function refreshUserFav(){
        
        try {

            const updateCompany = await retrieveCompanyById(companyId, userId)
            
            await setCompany(updateCompany)
            
         } catch ({message}) {
            console.log(message)
         }
    }

    async function onFav(){
        try {
           
            await toggleFav(userId, companyId)    
            await refreshUserFav()
            
           
        } catch ({message}) {
            console.log(message)

        }
    }


    return  <>
               
               {    (company.isFav ? 
                    <button className="btn-fav" onClick={onFav}><i className="fas fa-heart"></i></button> :
                    <button className="btn-fav" onClick={onFav}><i className="far fa-heart"></i></button>)
                }
                
            </>
           
}