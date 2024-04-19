'use client';

import React, { useEffect } from 'react'
import '@/styles/ranking.css'
import axios from 'axios';

const Ranking = () => {
    const [data, setData] = React.useState([]);

    const loadRanking = async () => {
        await axios.get(`/api/stats/find`, {
        }).then(response => {
            setData(response.data);
        })
    }

    useEffect(() => {
        loadRanking();
    }, [data])

    return (
        <div className='containerRanking'>
            <div className='contentTitle'>
                <div className='title'>Classement</div>
            </div>
            <div className='contentPlayer'>

            </div>
        </div>
    )
}

export default Ranking