'use client'

import React, { useEffect, useState } from 'react';
import css from '@/styles/board.module.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const Board = () => {
    const [word, setWord] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        axios.get("https://trouve-mot.fr/api/random")
            .then((response) => {
                setWord(response.data[0].name.toUpperCase());
                setLoading(false);
                setGuessedLetters(new Set(response.data[0].name.toUpperCase()[0]));
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError('Failed to load word');
                    setLoading(false);
                }
            });

        const handleKeyPress = (event: KeyboardEvent) => {
            const { key } = event;
            if (key.length === 1 && key.match(/[A-Z]/i)) {
                setGuessedLetters(prev => new Set(prev.add(key.toUpperCase())));
            }
        };
        window.addEventListener('keypress', handleKeyPress);

        return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);

    if (loading) return <CircularProgress sx={{ color: "rgb(240, 247, 246)" }} />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={css.container}>
            {Array.from(word).map((letter, index) => (
                <div key={index} className={css.contentCase}>
                    <div className={css.letter}>
                        {guessedLetters.has(letter) ? letter : ''}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Board;