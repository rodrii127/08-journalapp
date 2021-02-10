import React from 'react';
import logo from './08-journalapp/static/media/loading.gif';

export const LoadingScreen = () => {
    return (
        <div className='auth__main'>
            <img src={ logo } alt = 'Loading' className='auth__loading-gif' />
        </div>
    )
}
