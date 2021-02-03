import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeUiError, setUiError } from '../../actions/uiAction';
import { starRegisterWithPasswordName } from '../../actions/authAction';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msg } = useSelector(({ ui }) => ui);

    console.log(msg);

    const [formValues, handleInputChange] = useForm({
        name: 'Rodrigo',
        email: 'rodrigo.rodriguez@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(starRegisterWithPasswordName( name, email, password ));
        }
    }

    const isFormValid = () => {
        if ((name.trim().length === 0)) {
            dispatch(setUiError('Name should contain at least 1 character.'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setUiError('The email is not valid.'));
            return false;
        } else if (password !== password2) {
            dispatch(setUiError('The password should be equals.'));
            return false;
        } else if (password.length < 6) {
            dispatch(setUiError('Password should contain at least 6 character.'));
            return false;
        }
        dispatch(removeUiError());
        return true;
    }

    return (
        <div>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleRegister}>
                {
                    msg != null &&
                    <div className='auth__alert-error'> {msg} </div>
                }
                <input type='text' placeholder='Name' name='name' className='auth__input' autoComplete='off' value={name} onChange={handleInputChange} />
                <input type='text' placeholder='Email' name='email' className='auth__input' autoComplete='off' value={email} onChange={handleInputChange} />
                <input type='password' placeholder='Password' name='password' className='auth__input' value={password} onChange={handleInputChange} />
                <input type='password' placeholder='Confirm password' name='password2' className='auth__input' value={password2} onChange={handleInputChange} />
                <button type='submit' className='btn btn-primary btn-block mb-5'> Register </button>

                <Link to='/auth/login' className='link'>Already register?</Link>
            </form>
        </div>
    )
}
