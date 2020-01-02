import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import ButtonFavorite from '../ButtonFavorite'

export default withRouter(function ({ history, company, token }) { 

    

    if(!company.id) company.id = company._id
    delete company._id

    const {name, image, description} = company

    function goToDetail() { 
<<<<<<< HEAD
=======
        
        if(!company.id) company.id = company._id
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343

        const {id} = company
        history.push(`/detail/${id}`)
    }

    return <a className="profile" onClick = {function (event){
        event.preventDefault()
        goToDetail()  
    }}>

        <h3 className="profile-title">{name}</h3>
        <p className="profile-description">{description}</p>
<<<<<<< HEAD
        <ButtonFavorite token={token} companyId={id}  />
=======
        <ButtonFavorite userId={userId} companyId={company.id}/>
>>>>>>> f39bdc1919e812a5b19d5158337d2e4ef1463343
    </a>
})

/* import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import ButtonFavorite from '../ButtonFavorite'

export default withRouter(function ({ history, company, userId }) { 

    const {id, name, image, description, isFav} = company

    debugger

    function goToDetail() { 
        
        if(!company.id) company.id = company._id

        const {id} = company
        history.push(`/detail/${id}`)
    }

    return <a className="profile" onClick = {function (event){
        event.preventDefault()
        goToDetail()  
    }}>

        <h3 className="profile-title">{name}</h3>
        <p className="profile-description">{description}</p>
        <ButtonFavorite userId={userId} companyId={id}/>
    </a>
}) */