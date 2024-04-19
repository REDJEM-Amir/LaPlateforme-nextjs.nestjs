'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/styles/ranking.css';

type Stats = {
    username: string;
    score: number;
}

const Ranking = () => {
    const [data, setData] = useState<Stats[]>([]);

    const loadRanking = async () => {
        const response = await axios.get(`/api/stats/findStats`);
        setData(response.data);
    }

    useEffect(() => {
        loadRanking();
    }, [])

    return (
        <div className='containerRanking'>
            <div className='contentTitle'>
                <div className='title'>Classement</div>
            </div>
            {data.map((item, index) => (
                <div key={index} className='contentPlayer'>
                    <div className='score'>{item.score}</div>
                </div>
            ))}
        </div>
    );
}

export default Ranking;