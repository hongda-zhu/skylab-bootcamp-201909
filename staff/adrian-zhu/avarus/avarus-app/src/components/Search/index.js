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
