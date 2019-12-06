import React, {useState} from 'react'
import './index.sass'
import { withRouter, Link } from 'react-router-dom'
import Feedback from '../Feedback'
import registerUser from '../../logic'

export default withRouter (function ({ history, error, onRegister, onClose }) {

    // const [error , setError] = useState(undefined)
    
    // function handleSubmit(event){
    //     event.preventDefault()
    //     const { target : { name : { value : name } , surname : { value : surname } , email : { value : email } , username : { value : username }, password : { value : password } } } = event
    //     const budget = 5000
    //     handleRegister(name , surname , email , username, password, budget)
    // }

    // async function handleRegister(name , surname , email , username, password, budget){
    //     try{
    //         await registerUser(name , surname , email , username, password, budget)
    //         history.push("/login")
    //     }catch({ message }){
    //         setError((message))
    //     }
    // }

    return  <section className="reg">
    <div className="container-register">
        <div className="form-register">

        <h1 className="form-register__title">Register</h1>

        {/* <form type="submit" className="wrap-register" onSubmit={handleSubmit} > */}

            <form type="submit" className="wrap-register" onSubmit = {function(event){

                    event.preventDefault()

                    const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, password: {
                    value: password } } = event.target

                    onRegister(name, surname, email, username, password)

            }} >

                    <div className="wrap-register__input" data-validate="name is required">
                        <input className="wrap-login__input-container" type="text" name="name" placeholder="Name"/>
                        <span className="wrap-login__input-symbol">
                            <i className="fas fa-sort-alpha-down"></i>
                        </span>
                    </div>

                    <div className="wrap-register__input" data-validate="surname is required">
                        <input className="wrap-login__input-container" type="text" name="surname" placeholder="Surname"/>
                        <span className="wrap-login__input-symbol">
                            <i className="fas fa-sort-alpha-up-alt"></i>
                        </span>
                    </div>

                    <div className="wrap-register__input" data-validate="email is required">
                        <input className="wrap-login__input-container" type="email" name="email" placeholder="Email"/>
                        <span className="wrap-login__input-symbol">
                            <i className="far fa-envelope"></i>
                        </span>
                    </div>

                    <div className="wrap-register__input" data-validate="username is required">
                        <input className="wrap-login__input-container" type="username" name="username" placeholder="Username"/>
                        <span className="wrap-login__input-symbol">
                            <i className="far fa-user"></i>
                        </span>
                    </div>

                    <div className="wrap-register__input" data-validate="password is required">
                        <input className="wrap-login__input-container" type="password" name="password" placeholder="Password"/>
                        <span className="wrap-login__input-symbol">
                            <i className="fas fa-unlock-alt"></i>
                        </span>
                    </div>

                    <div className="wrap-register_btnContainer btnContainer">
                        <input type="submit" className="btnContainer__btn" value="Register"></input>
                    </div>
            </form>


                    <div className="form-register__textContainer">
                        
                        <Link className="form-register__textContainer-a" to="/">go Back?</Link>
                        
                    </div>
                        
                    <p className="form-register__copyright">@copyright by Adrían Zhu</p>     
            </div>
            {error && < Feedback message={error} onClose={onClose}/>}
    </div>
</section>
    
})