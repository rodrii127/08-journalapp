import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/authAction';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();

    const [ formValues, handleImputChange ] = useForm({
        email: 'rodrigo@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;
    
    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch( startLoginEmailPassword(email, password) );
    }

    const handleGoogleLogin = () =>{
        dispatch ( startGoogleLogin() );
    }

    return (
        <div> 
            <h3 className='auth__title'>Login</h3>
 
            <form onSubmit={ handleLogin }>
                <input type='text' placeholder='Email' name='email' className='auth__input' autoComplete='off' value = {email} onChange={handleImputChange} />
                <input type='password' placeholder='Password' name='password' className='auth__input' value = {password} onChange={handleImputChange} />
                <button type='submit' className='btn btn-primary btn-block'> Login </button>

                <div className='auth__social-networks'>
                    <p>Login with social networks</p>
                    <div className="google-btn" onClick= { handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to='/auth/register' className='link'>Crate a new account</Link>
            </form>
        </div>
    )
}
