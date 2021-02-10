import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startDelete, startSaveNote, startUploadingFile } from '../../actions/notesAction';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector( ({ notes }) => notes );

    const handleSaveNote = () =>{
        dispatch( startSaveNote( active ) );
    }

    const handlePicture = () =>{
        document.querySelector('#selectFile').click();
    }

    const handleSelectFile = (e) =>{
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploadingFile( file ) );
        }
    }

    const handleDelete = () => {
        dispatch( startDelete( active.id ) );
    }

    return (
        <div className='notes__appbar'>
            <span className='notes__date_appbar'> { moment().format("MMM Do YY") } </span>

            <input type='file' style={{display:'none'}} id='selectFile' name='file' onChange={handleSelectFile} />

            <div>
                {

                }
                <button className='btn btn-delete' onClick={ handleDelete } >Delete</button>
                <button className='btn' onClick={ handlePicture } >Picture</button>
                <button className='btn' onClick= { handleSaveNote } >Save</button>
            </div>
        </div>
    )
}
