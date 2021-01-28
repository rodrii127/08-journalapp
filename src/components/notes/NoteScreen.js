import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                
                <input 
                    type='text' 
                    placeholder='Some awesome tittle' 
                    className='notes__title-input' />
                
                <textarea 
                    placeholder='What happen today?' 
                    className='notes__textarea'></textarea>
                
                <div className='notes__image'>
                    <img src='https://i.pinimg.com/originals/06/71/9e/06719e446d9f1e81a60828add84563f9.jpg' alt='imagen' />
                </div>
            
            </div>
        </div>
    )
}
