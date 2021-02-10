import React from 'react';
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
    
    const {notes} = useSelector( ({ notes }) => notes );
    
    return (
        <div className='journal__entries'>

            {
                notes.map( entry =>(
                    <JournalEntry note = {entry} key={entry.id}/>
                )
                 )
            }
        </div>
    )
}
