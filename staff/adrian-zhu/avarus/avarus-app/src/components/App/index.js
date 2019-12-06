import React, {useState, useEffect} from 'react'
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Header from '../Header'
import Main from '../Main/'
import Footer from '../Footer'
import Feedback from '../Feedback'
import MainContext from '../Context'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { registerUser, authenticateUser, retrieveUser, retrieveCompanies } from '../../logic'
 

export default withRouter(function ({ history }) {


    const [name, setName] = useState()

    const [budget, setBudget] = useState()

    const [companies, setCompanies] = useState([])

    const [error, setError] = useState()


    useEffect(() => { 

      const { token } = sessionStorage;

      (async () => { 
        
          if (token) { 
              
              const {name, budget} = await retrieveUser(token)

              setName(name)
              setBudget(budget)

              // await listCompanies(token)
          }

      })()

    }, [sessionStorage.token])

    async function listCompanies(token) {
      
      const companies = await retrieveCompanies(token)

      setCompanies(companies)

    }
    

  
    async function handleRegister(name, surname, email, username, password){
        try {
        
          const budget = 5000

          await registerUser(name, surname, email, username, password, budget)
        
          history.push('/login')

        } catch(error){

          const { message } = error

          setError(message)

        }
      }



    async function handleLogin(username, password){
      
      try{ 
        
          const token = await authenticateUser(username, password)

          sessionStorage.token = token

          history.push("/main")

      }catch(error){

        const { message } = error
      
        setError((message))

      }
  }

  function handleListCompanies (){

      try {

        const token = sessionStorage.token



      } catch(error){

        const {message} = error

      }
  }

  function handleLogout () {

    sessionStorage.clear()
    history.push('/')

  }

  function handleCloseError () {
    setError(undefined)
  }

  const { token } = sessionStorage


  return <> 
      <Route exact path='/' render={() => <Landing />} />
      <Route path = '/register' render ={() => !token ? <Register onRegister={handleRegister} error={error} onClose={handleCloseError}/> : <Redirect to="/main" /> }  />
      <Route path = '/login' render = {() => !token ? <Login onLogin={handleLogin} error={error} onClose={handleCloseError}/> : <Redirect to="/" /> } />  


      {token && <> <Header name={name} budget={budget} onLogout={handleLogout} /></>} 
      
      <Route path = '/main' render = {() => token ? <> <Main listCompanies={handleListCompanies} error={error} onClose={handleCloseError} /> </>: <Redirect to="/" /> } />
      
      {/* <MainContext.Provider value={{setName}} >
      </MainContext.Provider> */}
      {token && <> <Footer /> </>} 
      
      {error && <Feedback message={error} onClose={handleCloseError}/>}


  </>
})