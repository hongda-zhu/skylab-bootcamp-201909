import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history, company, goToDetail }) { 

    const {id, name, image, description} = company

    function goToDetail() { 
        if(!company.id) company.id = company._id

        const {id} = company
        history.push(`/detail/${id}`)
    }

    return <a className="profile" onClick = {function (event){
        event.preventDefault()
        goToDetail()
    }}>
        <img src={image} className="profile-img"></img>
        <h3 className="profile-title">{name}</h3>
        <p className="profile-description">{description}</p>
    </a>
})