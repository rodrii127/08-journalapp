import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ( {
    isLogedIn,
    component: Component,
    ...rest
} ) => {
    return (
        <Route
            {...rest}
            component= {(props) =>
                (!(isLogedIn) ? <Component {...props} /> : (<Redirect to='/' />))
             }>
        </Route>
    )
}


PublicRoute.propTypes = {
    isLogedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}