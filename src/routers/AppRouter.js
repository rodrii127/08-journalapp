import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';   
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/authAction';


export const AppRouter = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName ) );   
            }

        } )
    }, []);
    
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/auth' component={AuthRouter} />
                    <Route exact path='/' component={JournalScreen} />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
