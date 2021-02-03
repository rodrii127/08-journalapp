import Swal from 'sweetalert2';

import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./uiAction";

const successSignIn = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const confirmLogout = (dispatch) => {
    Swal.fire({
        title: 'Do you want to exit the application?',
        confirmButtonText: 'Logout',
        denyButtonText: 'Cancel',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            firebase.auth().signOut();
            dispatch(logout());
            Swal.fire('Logout!', '', 'success')
        }
    })
}

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
            successSignIn.fire({ icon: 'success', title: 'Signed in successfully' });
        }).catch(err => {
            Swal.fire('ERROR', err.message, 'error');
            dispatch(finishLoading());
        })
    }
}


export const starRegisterWithPasswordName = (name, email, password) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(async ({ user }) => {
            await user.updateProfile({ displayName: name });
            dispatch(login(user.uid, user.displayName));

        }).catch(e => {
            Swal.fire('ERROR', e.message, 'error');
        })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider).then(({ user }) => {
            dispatch(login(user.uid, user.displayName));
            successSignIn.fire({ icon: 'success', title: 'Signed in successfully' });
        });
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

export const startLogout = (uid, displayName) => {
    return async (dispatch) => {
        confirmLogout(dispatch);
    }
}


export const logout = () => {
    return {
        type: types.logout
    }
}