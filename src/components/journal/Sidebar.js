import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/authAction';
import { startNewNote } from '../../actions/notesAction';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const { name } = useSelector(({ auth }) => auth);
    const { notes } = useSelector(({ notes }) => notes);

    const handleLogout = (e) => {
        dispatch(startLogout());

    }

    const handleAddNewEntry = () => {
        dispatch(startNewNote(notes));
    }

    return (
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                    <i className='far fa-moon'></i>
                    <span> {name} </span>
                </h3>

                <button className='btn btn-logout' onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className='journal__new-entry' onClick={handleAddNewEntry} >
                <i className='far fa-calendar-plus fa-5x' />
                <p className='mt-5' >
                    New Entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}
