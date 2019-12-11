import React, {useEffect, useState}  from 'react'
import Feedback from '../Feedback'
import {retrievePrices, retrieveCompanyDetail} from '../../logic'

export default function ({id}) {

    // const { token } = sessionStorage
    const [openPrice, setOpenPrice] = useState()
    const [lowerPrice, setLowerPrice] = useState()
    const [higherPrice, setHigherPrice] = useState()
    const [averagePrice, setAveragePrice] = useState()
    const [error, setError] = useState()
    let refresher
        
    useEffect(()=>{
        if (typeof refresher !== 'number' ) refresher = setInterval(()=>{
            (async()=>{ 
                try{
                    const {averagePrice, higherPrice, lowerPrice} = await retrievePrices(id)
                    const {stocks} = await retrieveCompanyDetail(id)

                    const openPrice = stocks[0].price

                    setOpenPrice(openPrice)
                    setAveragePrice(averagePrice)
                    setHigherPrice(higherPrice)
                    setLowerPrice(lowerPrice)
                    
                } catch(error){
                    setError(error.message)
                }
            })()
        }, 60000);
 
        (async()=>{
            try{

                const {averagePrice, higherPrice, lowerPrice} = await retrievePrices(id)
                debugger
                const {stocks} = await retrieveCompanyDetail(id)

                const openPrice = stocks[0].price

                setOpenPrice(openPrice)
                setAveragePrice(averagePrice)
                setHigherPrice(higherPrice)
                setLowerPrice(lowerPrice)

                debugger
                
            } catch(error){
                setError(error.message)                
            }
        })() 

        return () => { clearInterval(refresher)}
    },[averagePrice, higherPrice, lowerPrice])

    return <div className="container-stats stats">
    <table className="stats-tabla tabla">
        <tr>
            <th>Open:</th>
            <td>{openPrice}</td>
        </tr>
        <tr>
            <th>Higher:</th>
            <td>{higherPrice}</td>
        </tr>
        <tr>
            <th>Lower:</th>
            <td>{lowerPrice}</td>
        </tr>
        <tr>
            <th>Average:</th>
            <td>{averagePrice}</td>
        </tr>
    </table>

    {error && <Feedback text={error} />}
</div> 
    
}