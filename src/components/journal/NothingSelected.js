import React from 'react'

export const NothingSelected = () => {
    return (
        <div className='nothing__main-content'>
            <img src='./08-journalapp/static/media/loading.gif' alt = 'Loading' className='auth__loading-gif' alt='loaging' />
            <p>
                Select something
                <br />
                Or create an entry!
            </p>

            <i className='far fa-star fa-4x mt-5'></i>
        </div>
    )
}
