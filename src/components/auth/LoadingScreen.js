import React from 'react';
import logo from '../../static/loading.39ee2642.gif';

export const LoadingScreen = () => {
    return (
        <div className='auth__main'>
            <img src={ logo } alt = 'Loading' className='auth__loading-gif' />
        </div>
    )
}
