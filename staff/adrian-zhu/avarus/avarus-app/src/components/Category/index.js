import React from 'react'
import './index.sass'
import config from './config';
import Feedback from '../Feedback'
import CompanyList from '../CompanyList'
import { withRouter } from 'react-router-dom'

export default withRouter (function ({handleCategoryQuery, companies, error, onClose}) {

    function handleGoToCategory (event){ debugger

        event.preventDefault()
                    
        const categoryType = event.target.value
        
        handleCategoryQuery(categoryType)
    }

    return<nav className="main-nav">
                <div>
                    <select name="categoryType" className="input__select" onChange={handleGoToCategory} >

                {config.map(category => {return <option value= {category.name}>{category.contentText}</option>})}
                    </select>
                  
                </div>
                {companies && < CompanyList companies={companies}/>}
        
    </nav> 
})

// export default withRouter (function ({handleCategoryQuery, companies, error, onClose}) {

//     return<nav className="main-nav">
//         <ul className="main-nav__category category">

//             {config.map( category => { return  <li key={category.id}  className="category-company company">

//                 <button className="company-button button" onClick={event => {

//                     event.preventDefault()

//                     const categoryType = category.name  

//                     handleCategoryQuery(categoryType)

//                 }}><p className="button-name">{category.contentText}</p> <p className="button-signal"> <i className="fas fa-arrow-right"></i> </p>  

//                 </button>
//                 {error && < Feedback message={error} onClose={onClose}/>}
               
//             </li>
//             })}
//         </ul>

//         {companies && < CompanyList companies={companies}/>}
//     </nav> 
// })

{/* <nav className="main-nav">
        <ul className="main-nav__category category">
            
            {/* companies.map(company=>{<li  className="category-company company"> <Compo commpany={company}/> </li>}) */}
            
    //         <li className="category-company company">
    //             <button className="company-button button" onClick={event => {
    //                 event.preventDefault()
    //                 //handleCategoryQuery()
    //             }}>
                
    //             <p className="button-name">Treding</p> <p className="button-signal"> <i className="fas fa-arrow-right"></i> </p>  
    //             </button>
    //         </li> 

    //         <li className="category-company company">
    //             <button className="company-button button" onClick={event => {
    //                     event.preventDefault()
    //                     const category = "tech"  
    //                     handleCategoryQuery(category)                   
    //                 }}><p className="button-name">Tech</p> <p className="button-signal"> <i className="fas fa-arrow-right"></i> </p>  
    //                 </button>
    //             <ul className="button-list"></ul>
    //         </li>
            
    //         <li className="category-company company">
    //                 <button className="company-button button" onClick={event => {
    //                     event.preventDefault()
    //                     const category = "restaurant"  
    //                     handleCategoryQuery(category)                   
    //                 }}><p className="button-name">Restaurant</p> <p className="button-signal"> <i className="fas fa-arrow-right"></i> </p>
    //                 </button>
            
    //         </li>

    //         <li className="category-company company">
    //                 <button className="company-button button" onClick={event => {
    //                     event.preventDefault()
    //                     const category = "banking"  
    //                     //handleCategoryQuery(category)                   
    //                 }}><p className="button-name">Banking</p> <p className="button-signal"> <i className="fas fa-arrow-right"></i> </p>
    //                 </button>
    //         </li>

    //         <li className="category-company company">
    //                 <button className="company-button button" onClick={event => {
    //                         event.preventDefault()
    //                         const category = "sports"  
    //                         //handleCategoryQuery(category)                   
    //                     }}>
    //                     <p className="button-name">Sports</p> <p className="button-signal"> <i className="fas fa-arrow-right"></i> </p>
    //                 </button>
    //         </li>

    //         <li className="category-company company">
    //             <button className="company-button button" onClick={event => {
    //                     event.preventDefault()
    //                     const category = "gaming"  
    //                     //handleCategoryQuery(category)                   
    //                 }}>
    //                 <p className="button-name">Gaming</p> <p className="button-signal"> <i className="fas fa-arrow-right"></i> </p>
    //             </button>
    //             <ul className="button-list"></ul>
    //         </li>

    //         <li className="category-company company">
    //             <button className="company-button button" onClick={event => {
    //                     event.preventDefault()
    //                     const category = "fashion"  
    //                     //handleCategoryQuery(category)                   
    //                 }}>
    //                 <p className="button-name">Fashion</p> <p className="button-signal"> <i className="fas fa-arrow-right"></i> </p>
    //             </button>
    //             <ul className="button-list"></ul>
    //         </li>
    //     </ul>
    // </nav>   */}