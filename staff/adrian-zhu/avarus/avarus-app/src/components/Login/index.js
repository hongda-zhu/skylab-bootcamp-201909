import React from 'react'
import './index.sass'

export default function ({ onRegister, onLogin }) {

    // function Landing({history}) {
    //     history.push('/register')
    // }

    return  <section class="log hidden">
        <div class="container-login">
            <div class="form-login">
        
                <form type="submit" class="wrap-login">
        
                        <h1 class="wrap-login__title">LOGIN</h1>
        
                        <div class="wrap-login__input" data-validate="email is required">
                            <input class="wrap-login__input-container" type="email" name="email" placeholder="Email" />
                            <span class="wrap-login__input-symbol">
                                <i class="far fa-envelope"></i>
                            </span>
                        </div>
        
                        <div class="wrap-login__input" data-validate="password is required">
                            <input class="wrap-login__input-container" type="password" name="password" placeholder="Password" />
                            <span class="wrap-login__input-symbol">
                                <i class="fas fa-unlock-alt"></i>
                            </span>
                        </div>
                
                        <div class="wrap-login__btnContainer btnContainer">
                            <button class="btnContainer__btn">Login</button>
                        </div>
        
                        <div class="wrap-login__textContainer">
                            <a class="wrap-login__textContainer-a" href ="#">
                                Go back
                            </a>
        
                            <a class="wrap-login__textContainer-a" href="#">
                                Sign up now							
                            </a> 
                        </div>
                            
                        <p class="wrap-login__copyright">@copyright by Adrían Zhu</p>
        
                </form>     
            </div>
        </div>
    </section>

}