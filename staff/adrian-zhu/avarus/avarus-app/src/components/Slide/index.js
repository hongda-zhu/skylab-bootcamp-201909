import React from 'react'
// import './index.sass'
import config from './config'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({handleslideName}) {

    // const {id, name, image, description} = company


    return <ul className="navegator-list list">

            {config.map( slide => { return  <li key={slide._id}  className="list-item item">

                    <button className="item-button button" onClick={event => {

                        event.preventDefault()

                        const slideName = slide.name  

                        handleslideName(slideName)

            }}> <p className="button-name">{slide.contentText}</p>

            </button>
                </li>
            })}
    </ul>
})
