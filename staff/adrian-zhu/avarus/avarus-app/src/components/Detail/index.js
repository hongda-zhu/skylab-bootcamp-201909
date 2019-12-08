import React, {useState, useEffect} from 'react'
import './index.sass'
import Slide from '../Slide'
import Buy from '../Buy'
import Charts from '../Charts'
import Stats from '../Stats'
import About from '../About'
import { Link } from 'react-router-dom';
import { Route, withRouter, Redirect } from 'react-router-dom'
import {retrieveCompanyDetail} from '../../logic'

export default withRouter(function ({history, id}) { debugger

    const [slide, setSlide] = useState('buy')

    const [detail, setDetail] = useState()

    useEffect(() => { 

        // const { token } = sessionStorage;
  
        (async () => { 
          
           const companyDetail = await retrieveCompanyDetail(id)

           setDetail(companyDetail)
                
                
        })()
  
      }, [setDetail])

    async function handleslideName(slideName){
        
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
       history.push('/main')

   } 

    return <>{  detail && <section className="detail hidden">
    <div className="detail-container container">

        <div className="container-description description">
            <p className="description-title">{detail.name}</p>
            <button className ="description-button" onClick={goBackMain} >goBack</button>
            <img src="https://dummyimage.com/200x250/000/fff" className="description-image" />
            <p className="description-currentValue">55$</p>
            <p className="description-percentage__red"><i className="fas fa-arrow-down"></i> 3.06 (5.59%)</p>
            <p className="description-percentage__green"><i className="fas fa-arrow-up"></i> 3.06 (5.59%)</p> 
        </div>

        <nav className="container-navegator navegator">

            <Slide handleslideName={handleslideName} />

            {slide === 'buy' && <Buy />}
            {slide === 'charts' && <Charts />}
            {slide === 'stats' && <Stats />}
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