import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote } from '../../actions/notesAction';

export const NoteScreen = () => {
    
    const dispatch = useDispatch();

    const { active } = useSelector( ({notes}) => notes );
    const [ formValues, handleInputChange, reset ] = useForm({
        title: active.title,
        body: active.body,
        date: active.date,
        urlImage: active.urlImage
    });
    const { title, body } = formValues;

    //Para cambiar entre notas usamos esto a continuación, es muy importante para no generar bucles infinitos.
    const activeId = useRef( active.id );
    
    useEffect(() => {
        if ( activeId.current !== active.id ) {
            reset( active );
            activeId.current = active.id;
        }
        console.log(active.urlImage);
    }, [ active, reset ]);
    //Aca termina el cambio de nota

    //para actualizar la nota activa:
    useEffect(() => {
        dispatch( activeNote( activeId.current, {...formValues} ) );
    }, [ formValues, dispatch ]);
    
    return (
        <div className='notes__main-content jounral__main-content animate__animated animate__fadeInRight'>
            <NotesAppBar />

            <div className='notes__content'>
                
                <input 
                    type='text' 
                    placeholder='Some awesome tittle' 
                    className='notes__title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange} />
                
                <textarea 
                    placeholder='What happen today?' 
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange} ></textarea>
                
                {
                    active.urlImage === '' 
                    ? <img className='notes__image' src='https://i.pinimg.com/originals/06/71/9e/06719e446d9f1e81a60828add84563f9.jpg' alt='imagen' />
                    :  <img className='notes__image' src={active.urlImage} alt='imagen' />
                }
            </div>
        </div>
    )
}
