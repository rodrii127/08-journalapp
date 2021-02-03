import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./uiAction";

export const startLoginEmailPassword = (email, password) =>{
    return ( dispatch ) => {
        dispatch( startLoading() );
        firebase.auth().signInWithEmailAndPassword( email, password ).then( ({user}) => {
            dispatch( login( user.uid, user.displayName ) );
            dispatch( finishLoading() );    
        }).catch( err => {
            console.log(err);
            dispatch( finishLoading() );
        } )
        
    }
}


export const starRegisterWithPasswordName = ( name, email, password ) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password ).then( async({ user }) => {
            
            await user.updateProfile( {displayName: name} );
            
            dispatch( login( user.uid, user.displayName ) ); 
        } ).catch(e => {
            console.log(e);
        })
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider ).then( ({ user }) => {
            dispatch( login(user.uid, user.displayName) );
        } );

    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}