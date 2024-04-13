'use client'

import React, { useEffect, useState } from 'react';
import css from '@/styles/board.module.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const Board = () => {
    const [word, setWord] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const source = axios.CancelToken.source();
        setLoading(true);
        axios.get("https://trouve-mot.fr/api/random", { cancelToken: source.token })
            .then((response) => {
                setWord(response.data[0].name.toUpperCase());
                setLoading(false);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError('Failed to load word');
                    setLoading(false);
                }
            });
        return () => {
            source.cancel("Component unmounted");
        };
    }, []);

    const letters = Array.from(word);

    if (loading) return <CircularProgress sx={{color: "rgba(237, 108, 52, 1)" }}/>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={css.container}>
            {letters.map((letter, index) => (
                <div key={index} className={css.containerCase}>
                    <div className={css.content}>
                        <div className={css.letter}>{letter}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Board;