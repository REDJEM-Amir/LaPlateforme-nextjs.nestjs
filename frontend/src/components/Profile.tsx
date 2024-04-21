'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import css from '@/styles/profile.module.css';
import { GrMoney } from 'react-icons/gr';
import { GiTrophyCup } from 'react-icons/gi';

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

const Profile = () => {
    const [data, setData] = useState<Stats[]>([]);

    const load = async () => {
        const response = await axios.get(`/api/stats/findAllStatsByPlayer`);
        setData(response.data);
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <div className={css.container}>
            <div className={css.contentTitle}>
                <div className={css.title}>Profile</div>
            </div>
            {data.map((item, index) => (
                <div key={index} className={css.content}>
                    <div className={css.contentItem}>
                        <div className={css.label}>Nom du joueur:</div>
                        <div className={css.item}>{item.account.username}</div>
                    </div>
                    <div className={css.contentItem}>
                        <div className={css.label}>Score:</div>
                        <div className={css.item}>{item.score} <GrMoney /></div>
                    </div>
                    <div className={css.contentItem}>
                        <div className={css.label}>Parties gagné:</div>
                        <div className={css.item}>{item.wins}</div>
                    </div>
                    <div className={css.contentItem}>
                        <div className={css.label}>Parties perdu:</div>
                        <div className={css.item}>{item.losses}</div>
                    </div>
                    <div className={css.contentItem}>
                        <div className={css.label}>Niveau:</div>
                        <div className={css.item}>{item.difficulty} <GiTrophyCup /></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Profile