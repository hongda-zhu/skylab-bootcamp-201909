import React, { useState, useEffect }  from 'react'
import {toggleFav, retrieveCompanyById} from '../../logic'
import './index.sass'


<<<<<<< HEAD
export default function ({token, companyId}) {
    const [company, setCompany] = useState({})
=======
export default function ({userId, companyId}) {
    const [company, setCompany] = useState({})

    debugger
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343
   
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
<<<<<<< HEAD
                
                
                const updateCompany = await retrieveCompanyById(companyId, token)
                
                setCompany(updateCompany)

=======

            const updateCompany = await retrieveCompanyById(companyId, userId)
            
            await setCompany(updateCompany)
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343
            
         } catch ({message}) {
            console.log(message)
         }
    }

    async function onFav(event){
        try {
<<<<<<< HEAD

            event.preventDefault()

            await toggleFav(token, companyId) 
            
            await refreshUserFav()

=======
           
            await toggleFav(userId, companyId)    
            await refreshUserFav()
            
           
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343
        } catch ({message}) {
            console.log(message)

        }
    }

    return  <>
               
<<<<<<< HEAD
               { company && (company.isFav ? 
                    <button className="btn-fav" onClick={onFav}><i className="fas fa-money-bill-alt"></i></button> :
                    <button className="btn-fav" onClick={onFav}><i className="far fa-money-bill-alt"></i></button>)
=======
               {    (company.isFav ? 
                    <button className="btn-fav" onClick={onFav}><i className="fas fa-heart"></i></button> :
                    <button className="btn-fav" onClick={onFav}><i className="far fa-heart"></i></button>)
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343
                }
                
            </>
           
}