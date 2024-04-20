'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from '@/styles/ranking.module.css';
import { GiTrophyCup } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";

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
            <div className={css.row}>
                <div className={css.contentNameCol}>
                    <div className={css.nameCol}>Nom</div>
                </div>
                <div className={css.contentNameCol}>
                    <div className={css.nameCol}>Score</div>
                </div>
                <div className={css.contentNameCol}>
                    <div className={css.nameCol}>Niveau</div>
                </div>
            </div>
            <div className={css.contentPlayer}>
                {data.map((item, index) => (
                    <div key={index} className={css.rowItems}>
                        <div className={css.column}>
                            <div className={css.item}>{item.account.username}</div>
                        </div>
                        <div className={css.column}>
                            <div className={css.item}>{item.score} <GrMoney /></div>
                        </div>
                        <div className={css.column}>
                            <div className={css.item}>
                                {item.difficulty == 'Novice' && (
                                    <GiTrophyCup />
                                )}
                                {item.difficulty == 'Lexicographe' && (
                                    <>
                                        <GiTrophyCup />
                                        <GiTrophyCup />
                                    </>
                                )}
                                {item.difficulty == 'Maître des Mots' && (
                                    <>
                                        <GiTrophyCup />
                                        <GiTrophyCup />
                                        <GiTrophyCup />
                                    </>
                                )}
                                {item.difficulty == 'Virtuose du Vocabulaire' && (
                                    <>
                                        <GiTrophyCup />
                                        <GiTrophyCup />
                                        <GiTrophyCup />
                                        <GiTrophyCup />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ranking;