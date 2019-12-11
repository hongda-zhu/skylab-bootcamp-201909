import React, {useState, useEffect} from 'react'
import './index.sass'
import Slide from '../Slide'
import Comments from '../Comments'
import History from '../History'
import {priceProducer} from '../../utils'
import { Link } from 'react-router-dom';
import { Route, withRouter, Redirect } from 'react-router-dom'
import {retrieveBuyin} from '../../logic'
import { format } from 'path'
const moment = require('moment')

export default withRouter(function ({history, transactionId, onClose}) { 

    const [slide, setSlide] = useState('register')
    const [transactionDetail, setTransactionDetail] = useState()
    const [detail, setDetail] = useState()
    const [stockId, setStockId] = useState()
    const [error, setError] = useState()
    const [lastPrice, setLastPrice] = useState()
    let refresher
    
        
    useEffect(()=>{
        if (typeof refresher !== 'number' ) refresher = setInterval(()=>{

            (async()=>{  

                try{

                    const transactionDetail = await retrieveBuyin(transactionId)
                    setTransactionDetail(transactionDetail) 

                    const {companyDetail} = transactionDetail
                    setDetail(companyDetail) 

                    let lastPrice = companyDetail.stocks[companyDetail.stocks.length - 1].price.toFixed(6)

                    setLastPrice(lastPrice)

                    let lastStockId = companyDetail.stocks[companyDetail.stocks.length - 1].id

                    setStockId(lastStockId)
                    
                } catch(error){

                    setError(error.message)
                    
                }
            })()
        }, 1000);
 
        (async()=>{
            try{

                const transactionDetail = await retrieveBuyin(transactionId)
                setTransactionDetail(transactionDetail) 

                const {companyDetail} = transactionDetail
                setDetail(companyDetail) 

                let lastPrice = companyDetail.stocks[companyDetail.stocks.length - 1].price.toFixed(6)

                setLastPrice(lastPrice)

                let lastStockId = companyDetail.stocks[companyDetail.stocks.length - 1].id

                setStockId(lastStockId)
                
            } catch(error){
                setError(error.message)                
            }
        })() 

        return () => { clearInterval(refresher)}
    },[error, transactionDetail, lastPrice])
    
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

    async function goBackMain(event){
        event.stopPropagation()
        event.preventDefault()
        // history.push('/main')
        history.goBack()

    } 

    return <> { transactionDetail && <section className="operations">
    <div className="operations-boxes boxes">

        <div className="boxes-buyin buyin">
           
                <div className="buyin-title">
                    
                    Buy
                    
                </div>

                <div className="buyin-information information">
                    <div className="information-detail detail">
                        <div className="detail-property">Titulo 1</div>
                        <div className="detail-property">Titulo 2</div>
                        <div className="detail-property">Titulo 3</div>
                        <div className="detail-property">Titulo 4</div>
                        <div className="detail-property">Titulo 5</div>
                        <div className="detail-property">Titulo 6</div>
                        <div className="detail-property">Titulo 7</div>
                    </div>

                    <div className="information-detail detail">
                        <div className="detail-property">Valor 1</div>
                        <div className="detail-property">Valor 2</div>
                        <div className="detail-property">Valor 3</div>
                        <div className="detail-property">Valor 4</div>
                        <div className="detail-property">Valor 5</div>
                        <div className="detail-property">Valor 6</div>
                        <div className="detail-property">Valor 7</div>
                    </div>
                </div>
            </div>

        <form className="container-sellout sellout" onSubmit>


            <div className="sellout-title">
                    
                    Sell
                    
            </div>

            <div className="sellout-information information">
                <div className="information-detail detail">
                    <div className="detail-property">Titulo 1</div>
                    <div className="detail-property">Titulo 2</div>
                    <div className="detail-property">Titulo 3</div>
                    <div className="detail-property">Titulo 4</div>
                    <div className="detail-property">Titulo 5</div>
                    <div className="detail-property">Titulo 6</div>
                    <div className="detail-property">Titulo 7</div>
                </div>

                <div className="information-detail detail">
                    <div className="detail-property">Valor 1</div>
                    <div className="detail-property">Valor 2</div>
                    <div className="detail-property">Valor 3</div>
                    <div className="detail-property">Valor 4</div>
                    <div className="detail-property">Valor 5</div>
                    <div className="detail-property">Valor 6</div>
                    <div className="detail-property">Valor 7</div>
                </div> 
            </div>

            <div className="sellout-btn btn">


                <input className= "btn-click" type="submit" value="confirm"></input>
                    
            </div>

        </form>

        <div className="container-buttons buttons">

            <nav className="container-navegator navegator">


                <Slide handleslideName={handleslideName} detail={undefined}/>
                
                {/* {slide === 'goback' && <Buy userId={userId} companyId={companyId}stockId={stockId}/>}  */}
                {slide === 'register' && <History />}
                {slide === 'comments' && <Comments />}
            

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
//     const [stockId, setStockId] = useState()
//     const [error, setError] = useState()
//     const [lastPrice, setLastPrice] = useState()
//     let refresher
        
//     useEffect(()=>{
//         if (typeof refresher !== 'number' ) refresher = setInterval(()=>{

//             (async()=>{  

//                 try{

//                     const companyDetail = await retrieveCompanyDetail(companyId)
                    

//                     setTransactionDetail(companyDetail) 
    
//                     let lastPrice = companyDetail.stocks[companyDetail.stocks.length - 1].price.toFixed(6)

//                     setLastPrice(lastPrice)

//                     let lastStockId = companyDetail.stocks[companyDetail.stocks.length - 1].id

//                     setStockId(lastStockId)
                    
//                 } catch(error){

//                     setError(error.message)
                    
//                 }
//             })()
//         }, 60000);
 
//         (async()=>{
//             try{

//                 const companyDetail = await retrieveCompanyDetail(companyId)

//                 setTransactionDetail(companyDetail)

//                 let lastPrice = companyDetail.stocks[companyDetail.stocks.length - 1].price.toFixed(6)

//                 setLastPrice(lastPrice)

//                 let lastStockId = companyDetail.stocks[companyDetail.stocks.length - 1]._id

//                 setStockId(lastStockId)
                
//             } catch(error){
//                 setError(error.message)                
//             }
//         })() 

//         return () => { clearInterval(refresher)}
//     },[error, detail, lastPrice])


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
//             <p className="description-currentValue">${lastPrice}</p>
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