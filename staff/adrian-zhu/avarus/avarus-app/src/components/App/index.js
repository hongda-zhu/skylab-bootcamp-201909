import React, {useState, useEffect} from 'react'
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Header from '../Header'
import Main from '../Main/'
import Detail from '../Detail'
import Transactions from '../Transactions'
import Operations from '../Operations'
import Footer from '../Footer'
import Feedback from '../Feedback'
import Favorites from '../Favorites'
import UserPage from '../PersonalProfile'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { registerUser, authenticateUser, retrieveUser, editUser} from '../../logic'

 

export default withRouter(function ({ history }) {


    const [name, setName] = useState()

    const [surname, setSurname] = useState()

    const [email, setEmail] = useState()

    const [username, setUsername] = useState()

    const [budget, setBudget] = useState()

    const [password, setPassword] = useState()

    const [error, setError] = useState()

    const [id, setId] = useState()

    const [transactions, setTransactions] = useState([])

    const [favorites, setFavorites] = useState([])


    useEffect(() => { 

      refreshAll()

    }, [sessionStorage.token, favorites]) // transactions


    async function refreshAll(){
      
      const { token } = sessionStorage;
        
          if (token) { 
              
              const {id, name, surname, email, username, password, budget, transactions, favorites} = await retrieveUser(token)

              setName(name)
              setBudget(budget.toFixed(4))
              setId(id)
              setSurname(surname)
              setUsername(username)
              setEmail(email)
              setPassword(password)
              setTransactions(transactions)
              setFavorites(favorites)

          }
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

  async function handleModifyUser(name, surname, email) {
    try {
        
        await editUser(name, surname, email) 
        

        history.push('/main')
    } catch (error) {
        const { message } = error
        setError(message)
    }
}

  async function handleLogout () {

    sessionStorage.clear()
    history.push('/')

  }

  async function handleGoBack() {
    history.goBack()
  }

  async function handleCloseError () {
    setError(undefined)
  }

  const { token } = sessionStorage


  return <> 
      {token && <> <Header name={name} budget={budget} onLogout={handleLogout} /></>} 
      
      <Route exact path='/' render={() => !token ? <Landing />: <Main error={error} onClose={handleCloseError} token={token}/> }/>

      <Route path = '/register' render ={() => !token ? <Register onRegister={handleRegister} error={error} onClose={handleCloseError}/> : <Redirect to="/main" /> }  />

      <Route path = '/login' render = {() => !token ? <Login onLogin={handleLogin} error={error} onClose={handleCloseError}/> : <Redirect to="/" /> } />  

      <Route path = '/main' render = {() =>  <Main error={error} onClose={handleCloseError} token={token} /> } />

      <Route path = '/detail/:id' render={({ match: { params: { id:companyId } } })  => token && id ? <> <Detail userId={id} companyId={companyId} onBuy={refreshAll}/> </>: <Redirect to="/" />  } />

      <Route path="/userpage" render={() => token ? <UserPage name={name} surname={surname} email={email} username={username} password={password} onModifyUser={handleModifyUser} onBack={handleGoBack} error={error} onClose={handleCloseError}  /> : <Redirect to="/" />} />

      <Route path = '/transactions' render={() => transactions && token && id && <Transactions  userId={id} transactions={transactions} error={error} onClose={handleCloseError} />  } />

      <Route path = '/favorites' render={() => transactions && token && id && <Favorites favorites={favorites} />  } />
      
      <Route path = '/detailTransactions/:id/' render={({ match: { params: { id:transactionId } } })  => token && id ? <> <Operations transactionId={transactionId} error={error} onClose={handleCloseError} onSell={refreshAll}/> </>: <Redirect to="/" />  } />
  
      {/* <MainContext.Provider value={{setName}} >
      </MainContext.Provider> */}
      {token && <> <Footer /></>} 
      
      {error && <Feedback message={error} onClose={handleCloseError}/>}
      
  </>
  
})