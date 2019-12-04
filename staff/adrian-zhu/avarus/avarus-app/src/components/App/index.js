import React, {useState, useEffect} from 'react'
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { registerUser } from '../../logic'
 
export default withRouter(function ({ history }) {

    const [name, setName] = useState()
    const [error, setError] = useState()
  
    async function handleRegister(name, surname, email, username, password){
        try{
          await registerUser(name, surname, email, username, password)
        
          history.push('/login')
        }catch(error){
          const { message } = error
          setError(message)
        }
      }

  return <>
      <Route exact path='/' render={() => <Landing />} />
      <Route path = '/register' render ={() => <Register onRegister={handleRegister} error={error} />} /> 
      <Route path = '/login' render = {() => <Login />} /> 
  </>
})