import React, {useState, useEffect} from 'react'
import './index.sass'
import Slide from '../Slide'
import Buy from '../Buy'
import Charts from '../Charts'
import Stats from '../Stats'
import About from '../About'
import {priceProducer} from '../../utils'
import { Link } from 'react-router-dom';
import { Route, withRouter, Redirect } from 'react-router-dom'
import {retrieveCompanyDetail} from '../../logic'
import { format } from 'path'
const moment = require('moment')

export default withRouter(function ({userId, companyId, history}) { 

    const [slide, setSlide] = useState('buy')
    const [detail, setDetail] = useState()
    const [stockId, setStockId] = useState()
    const [error, setError] = useState()
    const [lastPrice, setLastPrice] = useState()
    let refresher
        
    useEffect(()=>{
        if (typeof refresher !== 'number' ) refresher = setInterval(()=>{

            (async()=>{  

                try{

                    const companyDetail = await retrieveCompanyDetail(companyId)
                    

                    setDetail(companyDetail) 
    
                    let lastPrice = companyDetail.stocks[companyDetail.stocks.length - 1].price.toFixed(6)

                    setLastPrice(lastPrice)

                    let lastStockId = companyDetail.stocks[companyDetail.stocks.length - 1].id

                    setStockId(lastStockId)
                    
                } catch(error){

                    setError(error.message)
                    
                }
            })()
        }, 60000);
 
        (async()=>{
            try{

                const companyDetail = await retrieveCompanyDetail(companyId)

                setDetail(companyDetail)

                let lastPrice = companyDetail.stocks[companyDetail.stocks.length - 1].price.toFixed(6)

                setLastPrice(lastPrice)

                let lastStockId = companyDetail.stocks[companyDetail.stocks.length - 1]._id

                setStockId(lastStockId)
                
            } catch(error){
                setError(error.message)                
            }
        })() 

        return () => { clearInterval(refresher)}
    },[error, detail, lastPrice])


    async function handleslideName(slideName, detail){
        
        switch(slideName){
            case 'buy':
                setSlide('buy');
            break;
            case 'charts':
                setSlide('charts');
                break;
            case 'stats':
                setSlide('stats');
                break;
            case 'about':
                setSlide('about');
                break;
        }
   }

    async function goBackMain(event){
        event.stopPropagation()
        event.preventDefault()
        // history.push('/main')
        history.goBack()

    } 


    return <>{  detail && <section className="detail hidden">
    <div className="detail-container container">

        <div className="container-description description">
            <p className="description-title">{detail.name}</p>
            <button className ="description-button" onClick={goBackMain} >goBack</button>
            <img src="https://dummyimage.com/200x250/000/fff" className="description-image" />
            <p className="description-currentValue">${lastPrice}</p>
            <p className="description-percentage__red"><i className="fas fa-arrow-down"></i> 3.06 (5.59%)</p>
            <p className="description-percentage__green"><i className="fas fa-arrow-up"></i> 3.06 (5.59%)</p> 
        </div>

        <nav className="container-navegator navegator">


            <Slide handleslideName={handleslideName} detail={detail}/>

            {slide === 'buy' && <Buy userId={userId} companyId={companyId} stockId={stockId}/>} 
            {slide === 'charts' && <Charts id={companyId} />}
            {slide === 'stats' && <Stats id={companyId} />}
            {slide === 'about' && <About Headquarters={detail.description}/>}
        </nav>

    </div>
</section>} </>

})


// {return  detail? <section className="detail hidden">
// <div className="detail-container container">

//     <div className="container-description description">
// <p className="description-title">{name}</p>
//         <button className ="description-button" onClick={goBackMain} >goBack</button>
//         <img src="https://dummyimage.com/200x250/000/fff" className="description-image" />
//         <p className="description-currentValue">55$</p>
//         <p className="description-percentage__red"><i className="fas fa-arrow-down"></i> 3.06 (5.59%)</p>
//         <p className="description-percentage__green"><i className="fas fa-arrow-up"></i> 3.06 (5.59%)</p> 
//     </div>

//     <nav className="container-navegator navegator">

//         <Slide handleslideName={handleslideName} />

//         {slide === 'buy' && <Buy />}
//         {slide === 'charts' && <Charts />}
//         {slide === 'stats' && <Stats />}
//         {slide === 'about' && <About />}
//     </nav>

// </div>
// </section> : <> </>}

// })