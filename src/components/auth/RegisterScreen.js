import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
    
    const [ formValues, handleInputChange ] = useForm({
        name: 'Rodrigo',
        email: 'rodrigo.rodriguez@gmail.com',
        password: '1234',
        password2: '1234'
    }); 

    const { name, email, password, password2 } = formValues;
    
    const handleRegister = (e) =>{
        e.preventDefault();
        if ( isFormValid() ) {
            console.log('son iguales');
        }
    }

    const isFormValid = () =>{
        //TODOs
    }

    return (
        <div>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit = { handleRegister }>
                <input type='text' placeholder='Name' name='name' className='auth__input' autoComplete='off' value={name} onChange= {handleInputChange} />
                <input type='text' placeholder='Email' name='email' className='auth__input' autoComplete='off' value={email} onChange= {handleInputChange} />
                <input type='password' placeholder='Password' name='password' className='auth__input' value={password} onChange= {handleInputChange}/>
                <input type='password' placeholder='Confirm password' name='password2' className='auth__input' value={password2} onChange= {handleInputChange}/>
                <button type='submit' className='btn btn-primary btn-block mb-5'> Register </button>

                <Link to='/auth/login' className='link'>Already register?</Link>
            </form>
        </div>
    )
}
