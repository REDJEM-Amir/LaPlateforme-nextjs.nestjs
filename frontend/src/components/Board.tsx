'use client'

import React, { useEffect, useState } from 'react';
import css from '@/styles/board.module.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const Board = ({
    currentGuess,
    setInitialGuess
}:{
    currentGuess: string,
    setInitialGuess: (letter: string) => void
}) => {
    const [word, setWord] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        axios.get("https://trouve-mot.fr/api/random")
            .then((response) => {
                const fetchedWord = response.data[0].name.toUpperCase();
                setWord(fetchedWord);
                setInitialGuess(fetchedWord[0]);
                setLoading(false);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError('Failed to load word');
                    setLoading(false);
                }
            });
    }, [setInitialGuess]);

    if (loading) return <CircularProgress sx={{ color: "rgb(240, 247, 246)" }} />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={css.container}>
            {Array.from(word).map((letter, index) => (
                <div key={index} className={css.contentCase}>
                    <div className={css.letter}>
                    {index < currentGuess.length ? currentGuess[index] : ''}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Board;