import React from 'react'
import './index.sass'

export default function ({ company }) { debugger

    const {name, image, description} = company

    return <a href="" className="profile">
        <img src={image} className="profile-img"></img>
        <h3 className="profile-title">{name}</h3>
        <p className="profile-description">{description}</p>
    </a>
}