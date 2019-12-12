import React, {useState, useEffect} from 'react'
import './index.sass'
import Slide from '../Slide'
import Comments from '../Comments'
import History from '../History'
import {priceProducer} from '../../utils'
import { Link } from 'react-router-dom';
import { Route, withRouter, Redirect } from 'react-router-dom'
import {retrieveBuyin, sellOut} from '../../logic'
import { format, parse } from 'path'
const moment = require('moment')

export default withRouter(function ({history, transactionId, onSell}) { 

    const [slide, setSlide] = useState('register')
    const [transactionDetail, setTransactionDetail] = useState()
    const [purchasedPrice, setPurchasedPrice] = useState()
    const [costs, setCosts] = useState()
    const [purchasedTime, setPurchasedTime] = useState()
    const [detail, setDetail] = useState()
    const [lastStockTime, setLastStockTime] = useState()
    const [error, setError] = useState()
    const [currentPrice, setCurrentPrice] = useState()
    const [gain, setGain] = useState(0)
    const [gainResult, setGainResult] = useState()
    const [relatedTo, setRelatedTo] = useState([])
    
    let refresher
    
        
    useEffect(()=>{
        if (typeof refresher !== 'number' ) refresher = setInterval(()=>{

            (async()=>{  

                try{

                    const transactionDetail = await retrieveBuyin(transactionId)
                    setTransactionDetail(transactionDetail) 

                    const {company} = transactionDetail
                    setDetail(company)             

                    let currentPrice = company.stocks[company.stocks.length - 1].price.toFixed(4)
                    setCurrentPrice(currentPrice)

                    const {stockSelected} = transactionDetail
                    const purchasedPrice = stockSelected.price.toFixed(4)
                    setPurchasedPrice(purchasedPrice)

                    const {amount} = transactionDetail
                    const costs = amount.toFixed(4)
                    setCosts(costs)

                    const {relatedTo} = transactionDetail
                    setRelatedTo(relatedTo)
    

                    const {time} = transactionDetail
                    const purchasedTime = moment(time).format('DD/MM/YY hh:mm')
                    setPurchasedTime(purchasedTime)

                    let lastStockTime = moment(company.stocks[company.stocks.length - 1].time).format('DD/MM/YY hh:mm')

                    setLastStockTime(lastStockTime)
                    
                } catch(error){

                    setError(error.message)
                    
                }
            })()
        }, 60000);
 
        (async()=>{
            try{

                const transactionDetail = await retrieveBuyin(transactionId)
                setTransactionDetail(transactionDetail) 

                const {company} = transactionDetail
                setDetail(company) 

                let currentPrice = company.stocks[company.stocks.length - 1].price.toFixed(4)
                setCurrentPrice(currentPrice)

                const {stockSelected} = transactionDetail
                const purchasedPrice = stockSelected.price.toFixed(4)
                setPurchasedPrice(purchasedPrice)

                const {amount} = transactionDetail
                const costs = amount.toFixed(4)
                setCosts(costs)

                const {time} = transactionDetail
                const purchasedTime = moment(time).format('DD/MM/YY hh:mm')
                setPurchasedTime(purchasedTime)

                const {relatedTo} = transactionDetail
                setRelatedTo(relatedTo)

                let lastStockTime = moment(company.stocks[company.stocks.length - 1].time).format('DD/MM/YY hh:mm')

                setLastStockTime(lastStockTime)

                
            } catch(error){
                setError(error.message)                
            }
        })() 

        return () => { clearInterval(refresher)}
    },[error, transactionDetail, currentPrice, setGainResult, setGain, gain])
    
    async function handleslideName(slideName, transactionDetail){
        
        switch(slideName){
            case 'goback':
                setSlide('goback');
            break;
            case 'history':
                setSlide('history');
                break;
            case 'comments':
                setSlide('comments');
                break;
        }
   }

    async function handleOnSell(userId, companyId, stockId, buyInTransactionId, operation, quantity){
        try {

            quantity = parseInt(quantity)

            await sellOut(userId, companyId, stockId, buyInTransactionId, operation,quantity)

            onSell()

        }catch({message}) {

            console.log(message)

        }
    }

    async function goBackMain(event){

        try {

            event.stopPropagation()
            event.preventDefault()
            // history.push('/main')
            history.goBack()
     
        }catch({message}) {

            console.log(message)

        }

    } 

    
    return <> { transactionDetail && <section className="operations"> 

    <div className="operations-boxes boxes">

        <div className="boxes-buyin buyin">
           
                <div className="buyin-title">
                    
                    Purchase
                    
                </div>

                <div className="buyin-information information">
                    <div className="information-detail detail">
                        <div className="detail-property">Current Price</div>
                        <div className="detail-property">Price</div>
                        <div className="detail-property">Quantity</div>
                        <div className="detail-property">Costs</div>
                        <div className="detail-property">Purchased Date</div>
                        <div className="detail-property">Current Date</div>
                        <div className="detail-property">Company</div>
                    </div>

                    <div className="information-detail detail">
                        <div className="detail-property">{currentPrice}</div>
                        <div className="detail-property">{purchasedPrice}</div>
                        <div className="detail-property">{transactionDetail.quantity}</div>
                        <div className="detail-property">{costs}</div>
                        <div className="detail-property">{purchasedTime}</div>
                        <div className="detail-property">{lastStockTime}</div>
                        <div className="detail-property">{transactionDetail.company.name}</div>
                    </div>
                </div>
            </div>

        <form className="container-sellout sellout" onSubmit={ function(event){

            try {

                event.preventDefault()
                const {quantity: {value: quantity}}= event.target
                const operation = 'sell-out'
                
                handleOnSell(transactionDetail.user._id, transactionDetail.company._id, transactionDetail.stockSelected._id, transactionDetail._id, operation, quantity)

            } catch ({message}) {

                console.log(message)

            }

        }

        }>


            <div className="sellout-title">
                    
                    Sale
                    
            </div>

            <div className="sellout-information information">
                <div className="information-detail detail">
                    <div className="detail-property">Quantity</div>
                    <div className="detail-property">Gain</div>
                </div>

                <div className="information-detail detail">

                    {transactionDetail.quantity > 0 ? <input className="detail-boxes " type="quantity" name="quantity" onChange={event => {setGain(event.target.value) 
                    setGainResult(gain * currentPrice)} } value={gain}></input>: <div  className="detail-block"> 0 </div>}


                    { gainResult >=0 ? <div className="detail-property" placeholder >{gainResult}</div> :  <div className="detail-property" placeholder > 0 </div> }

                </div> 
            </div>

            <div className="sellout-btn btn">


                {transactionDetail.quantity > 0 ? <input className= "btn-click" type="submit" value="confirm"></input> : <input className= "btn-click" type="submit" value="confirm" disabled></input>}
                    
            </div>

        </form>

        <div className="container-buttons buttons">

            <nav className="container-navegator navegator">
            <div className="navegator-btn">
                <button className ="navegator-btn__form" onClick={goBackMain} >goBack</button>
            </div>

                <Slide handleslideName={handleslideName} detail={undefined}/>


                {slide === 'register' && <History sellRegisters = {relatedTo} />}
                {/* {slide === 'comments' && <Comments />} */}
            

            </nav>

        </div>

    </div>

    </section>} </>
})


// import React, {useState, useEffect} from 'react'
// // import './index.sass'
// import Slide from '../Slide'
// import Buy from '../Buy'
// import Charts from '../Charts'
// import Stats from '../Stats'
// import About from '../About'
// import {priceProducer} from '../../utils'
// import { Link } from 'react-router-dom';
// import { Route, withRouter, Redirect } from 'react-router-dom'
// import {retrieveCompanyDetail} from '../../logic'
// import { format } from 'path'
// const moment = require('moment')

// export default withRouter(function ({userId, companyId, history}) { 

//     const [slide, setSlide] = useState('buy')
//     const [detail, setTransactionDetail] = useState()
//     const [lastStockTime, setLastStockTime] = useState()
//     const [error, setError] = useState()
//     const [currentPrice, setCurrentPrice] = useState()
//     let refresher
        
//     useEffect(()=>{
//         if (typeof refresher !== 'number' ) refresher = setInterval(()=>{

//             (async()=>{  

//                 try{

//                     const companyDetail = await retrieveCompanyDetail(companyId)
                    

//                     setTransactionDetail(companyDetail) 
    
//                     let currentPrice = companyDetail.stocks[companyDetail.stocks.length - 1].price.toFixed(6)

//                     setCurrentPrice(currentPrice)

//                     let lastStockTime = companyDetail.stocks[companyDetail.stocks.length - 1].id

//                     setLastStockTime(lastStockTime)
                    
//                 } catch(error){

//                     setError(error.message)
                    
//                 }
//             })()
//         }, 60000);
 
//         (async()=>{
//             try{

//                 const companyDetail = await retrieveCompanyDetail(companyId)

//                 setTransactionDetail(companyDetail)

//                 let currentPrice = companyDetail.stocks[companyDetail.stocks.length - 1].price.toFixed(6)

//                 setCurrentPrice(currentPrice)

//                 let lastStockTime = companyDetail.stocks[companyDetail.stocks.length - 1]._id

//                 setLastStockTime(lastStockTime)
                
//             } catch(error){
//                 setError(error.message)                
//             }
//         })() 

//         return () => { clearInterval(refresher)}
//     },[error, detail, currentPrice])


//     async function handleslideName(slideName){
        
//         switch(slideName){
//             case 'buy':
//                 setSlide('buy');
//             break;
//             case 'charts':
//                 setSlide('charts');
//                 break;
//             case 'stats':
//                 setSlide('stats');
//                 break;
//             case 'about':
//                 setSlide('about');
//                 break;
//         }
//    }

//     async function goBackMain(event){
//         event.stopPropagation()
//         event.preventDefault()
//         // history.push('/main')
//         history.goBack()

//     } 

    

//     return <>{  detail && <section className="detail hidden">
//     <div className="detail-container container">

//         <div className="container-description description">
//             <p className="description-title">{detail.name}</p>
//             <button className ="description-button" onClick={goBackMain} >goBack</button>
//             <img src="https://dummyimage.com/200x250/000/fff" className="description-image" />
//             <p className="description-currentValue">${currentPrice}</p>
//             <p className="description-percentage__red"><i className="fas fa-arrow-down"></i> 3.06 (5.59%)</p>
//             <p className="description-percentage__green"><i className="fas fa-arrow-up"></i> 3.06 (5.59%)</p> 
//         </div>

//         <nav className="container-navegator navegator">


//             <Slide handleslideName={handleslideName} detail={undefined} />

//             {slide === 'buy' && <Buy />} 
//             {slide === 'charts' && <Charts  />}
//             {slide === 'stats' && <Stats />}
//         </nav>

//     </div>
// </section>} </>

// })