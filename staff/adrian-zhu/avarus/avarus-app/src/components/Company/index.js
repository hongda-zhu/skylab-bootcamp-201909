import React from 'react'

export default function ({ company }) { 

    const {company: {name, image, risk, description}} = company

    return <a href="#" className="stock-profile profile">
        <p className="profile-title">{name}</p>
        <img src={image} className="profile-img"></img>
        <p>{risk}</p>
        <p>{description}</p>
    </a>
}