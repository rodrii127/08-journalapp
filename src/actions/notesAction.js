import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './uiAction';

export const startNewNote = ( notes ) =>{
    return async( dispatch, getState ) =>{        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            urlImage: ''
        }
        const docRef =  await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch( activeNote( docRef.id, newNote ) );
        newNote.id = docRef.id;
        notes.push( newNote );
    }
}


export const activeNote = (id, note) =>{
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note,
        }
    }
}


export const loadNotes = ( uid ) =>{
    return async ( dispatch ) => {
        dispatch( startLoading() );
        const notesDB = await db.collection(`${uid}/journal/notes`).get();
        const notes = [];
        notesDB.forEach( noteHijo => {
            notes.push( {
                id: noteHijo.id,
                title: noteHijo.data().title,
                body: noteHijo.data().body,
                date: noteHijo.data().date,
                urlImage: noteHijo.data().urlImage,
            } )
        } )
        dispatch( setNote( notes ) );
        dispatch( finishLoading() );
    }
}

export const setNote = ( notes ) =>{
    return {
        type: types.notesLoad,
        payload: notes
    }
}


export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;
        
        await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Note Saved', '', 'success');
    }
}

export const refreshNote = ( id, note ) =>{
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
}

export const startUploadingFile = ( file ) => {
    return  async ( dispatch, getState ) => {
        const { active } = getState().notes;
        
        Swal.fire({
            title: 'Uploading image.',
            text: 'Please wait.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });

        const fileUrl = await fileUpload( file );
        active.urlImage = fileUrl;
        
        dispatch( startSaveNote(active) );
        
        Swal.close();
    }
}

export const fileUpload = async( file ) =>{
    const urlCloudinary = '	https://api.cloudinary.com/v1_1/dziczfi4f/upload';
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file );
    try {
        const resp = await fetch( urlCloudinary, {
            method: 'POST',
            body: formData
        } );

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
    } catch (error) {
        console.log(error);    
    }
}

export const startDelete = ( id ) =>{
    return async( dispatch, getState ) =>{
        const { uid } = getState().auth;
        confirmDelete(dispatch, uid, id );
    }
}

const confirmDelete = (dispatch, uid, id) => {
    let isDelete = false;
    Swal.fire({
        title: 'You\'ll not able to recover this note.',
        icon: 'warning',
        confirmButtonText: 'Delete',
        showCancelButton: true,
    }).then((result) => {
        isDelete = result.isConfirmed;
        if (result.isConfirmed) {
            db.doc(`${uid}/journal/notes/${id}`).delete();
            dispatch( deleteNote( id ) );
            Swal.fire('Deleted!', '', 'success');
        }
    })
    return isDelete;
}

export const deleteNote = ( id ) =>{
    return{
        type: types.notesDelete,
        payload: id 
    }
}


export const noteLogout = () =>{
    return{
        type: types.notesLogoutCleaning
    }
}