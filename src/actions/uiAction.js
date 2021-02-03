import { types } from '../types/types';

export const setUiError = (msg) => {
    return {
        type: types.uiSetError,
        payload: msg
    }
}

export const removeUiError = () => {
    return {
        type: types.uiRemoveError
    }
}

export const startLoading = () =>{
    return{
        type: types.uiStartLoading
    }
}

export const finishLoading = () =>{
    return{
        type: types.uiFinishLoading
    }
}