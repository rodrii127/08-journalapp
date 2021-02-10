import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';
import { LoadingScreen } from '../auth/LoadingScreen';


import "../responsive/Sidebar.css";
import SidebarResponsive from '../responsive/SidebarResponsive';

export const JournalScreen = () => {

    const { active } = useSelector(({ notes }) => notes);
    const { loading } = useSelector(({ ui }) => ui);

    const tamanio = window.innerWidth;

    return (
        <div >    {
            loading
                ? <LoadingScreen />
                : <div id="App" className='jounral__main-content animate__animated animate__fadeIn animate__faster	500ms'>
                    
                    {tamanio < 800 
                    ? <>
                    <SidebarResponsive pageWrapId={"page-wrap"} outerContainerId={"App"} />

                    <div id="page-wrap">
                    </div>
                    </> 
                    : 
                    <Sidebar />
                    }

                    <main>
                        {
                            active === null ? <NothingSelected /> : <NoteScreen />
                        }
                    </main>
                </div>
        }
        </div>
    )
}
