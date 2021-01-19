import React from 'react'

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>
            <div 
                className='journal__entry-picture' 
                style={{backgroundSize: 'cover',
                        backgroundImage: 'url(https://imagenesgratis.com.ar/wp-content/uploads/2020/03/river-plate-futbol-escudo-soccer-team-argentina-football-vertical-fondo-de-pantalla.jpg)'}}>
            </div>

            <div className='jorunal__entry-body'>
                <p className='journal__entry-title'>
                    Un nuevo día
                </p>
                <p className='jorunal__entry-content'>
                    PROBANDO PROBANDO PROBANDO PROBANDO PROBANDO PROBANDO
                </p>
            </div>

            <div className='jorunal__entry-date-box'>
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
