import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isLogedIn,
    component: Component,
    ...rest
}) => {

    // localStorage.setItem('lastPath', rest.location.pathname);

    return (
        <Route
            {...rest}
            component={ (props) => 
                ((isLogedIn) ? <Component {...props} /> : (<Redirect to='/auth' />))
            }
        />
    )
}

PrivateRoute.propTypes = {
    isLogedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}