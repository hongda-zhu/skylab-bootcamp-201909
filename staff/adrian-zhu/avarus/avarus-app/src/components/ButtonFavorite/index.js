 
import React, { useState, useEffect }  from 'react'
import {toggleFav, registerUser} from '../../logic'


export default function ({userId, companyId}) {
    const [spot, setUser] = useState(undefined)
   
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
            if(userId && companyId){
                
                const updatedUser = await registerUser(userId)
                
                setUser(updatedUser)

                debugger

            }
         } catch ({message}) {
             console.log(message)
         }
    }

    async function onFav(){
        try {
           if(userId && companyId){
            await toggleFav(userId,companyId)    
            await refreshUserFav()

            debugger
            
           }
        } catch ({message}) {
            console.log(message)

            
        }
    }


    return  <>
               
                    <button className="btn-fav" onClick={onFav}><i className="fas fa-heart"></i></button> 
                    {/* :
                     <button className="btn-fav" onClick={onFav}><i className="far fa-heart"></i></button>) */}
                
            </>
           
}