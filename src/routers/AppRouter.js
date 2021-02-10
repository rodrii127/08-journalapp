import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';   
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/authAction';
import { LoadingScreen } from '../components/auth/LoadingScreen';
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { loadNotes } from '../actions/notesAction';


export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( loadNotes(user.uid) );
                setIsLogedIn(true);
            }else{
                setIsLogedIn(false);
            }

            setChecking(false);
        } )
    }, [ dispatch, setChecking ]);
    
    if ( checking ) {
        return(
            <LoadingScreen/>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path='/auth' component={AuthRouter} isLogedIn = { isLogedIn } />
                    <PrivateRoute exact path='/' component={JournalScreen} isLogedIn = { isLogedIn } />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
