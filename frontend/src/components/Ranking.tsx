'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from '@/styles/ranking.module.css';

type Account = {
    username: string;
}

type Stats = {
    account: Account;
    score: number;
    wins: number;
    losses: number;
    difficulty: string;
}

const Ranking = () => {
    const [data, setData] = useState<Stats[]>([]);

    const loadRanking = async () => {
        const response = await axios.get(`/api/stats/findStats`);
        setData(response.data);
        console.log(response.data)
    }

    useEffect(() => {
        loadRanking();
    }, [])

    return (
        <div className={css.container}>
            <div className={css.contentTitle}>
                <div className={css.title}>Classement</div>
            </div>
            <div className={css.contentPlayer}>
                {data.map((item, index) => (
                    <div key={index} className={css.row}>
                        <div>Nom du joueur</div>
                        <div className={css.column}>
                            <div className={css.item}>{item.account.username}</div>
                        </div>
                        <div className={css.column}>
                            <div className={css.item}>{item.score}</div>
                        </div>
                        <div className={css.column}>
                            <div className={css.item}>{item.difficulty}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ranking;