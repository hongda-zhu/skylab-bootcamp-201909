import React, {useState} from 'react'
import './index.sass'
import config from './config';
import Feedback from '../Feedback'
import CompanyList from '../CompanyList'
import { withRouter } from 'react-router-dom'

export default withRouter (function ({handleNameQuery, handleCategoryQuery, companies, userId}) {


    const [error, setError] = useState()

    function handleCloseError () {
        setError(undefined)
      }


    function handleGoToCategory (event){ 

        try {
            event.preventDefault()
                    
            const categoryType = event.target.value
            
            handleCategoryQuery(categoryType)

        } catch(error){

            const { message } = error
          
            setError((message))
    
          }


    }

    function handleSubmitSearch (event) { 

        try {

            event.preventDefault()
            
            const {query: {value: query}} = event.target

            handleNameQuery(query)

        } catch(error){

            const { message } = error
          
            setError((message))
    
          }

    }

    return<section>
    <nav className="main-nav">
        <form type="submit" className="main-search" onSubmit={handleSubmitSearch}>
            <div className="main-search__box">

                <input className="main-search__text" name="query" placeholder="search" />
                <button className="main-search__btn" type="submit"><i className="fas fa-search"></i></button> 
                {error && < Feedback message={error} onClose={handleCloseError}/>}

            </div>
        </form>
    </nav> 

    <div className="main-select select">
        <select name="categoryType" className="select-box" onChange={handleGoToCategory} >
        <option value ="" defaultValue disabled hidden>Choose here</option>
        {config.map(category => {return <option key={category._id} value= {category.name}>{category.contentText}</option>})}
        </select>
            
    </div>

    <div className="main-print">

        {companies && < CompanyList companies={companies} userId={userId}/>}

    </div>


    {error && < Feedback message={error} onClose={handleCloseError}/>}
    </section>
    
    
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