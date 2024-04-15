'use client'

import React, { useEffect, useState } from 'react';
import css from '@/styles/board.module.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { FaArrowRotateLeft, FaCheck, FaDeleteLeft } from 'react-icons/fa6';

const Board = ({
    currentGuess,
    setInitialGuess
}: {
    currentGuess: string,
    setInitialGuess: (letter: string) => void
}) => {
    const [word, setWord] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        setLoading(true);
        axios.get("https://trouve-mot.fr/api/random")
            .then((response) => {
                const fetchedWord = response.data[0].name.toUpperCase();
                setWord(fetchedWord);
                setInitialGuess(fetchedWord[0]);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to load word');
                setLoading(false);
            });
    }

    const onValidate = () => {

    }

    const onRemove = () => {
        if (currentGuess.length > 1) {
            const updatedGuess = currentGuess.slice(0, -1);
            setInitialGuess(updatedGuess);
        }
    }    

    const onRefresh = () => {
        load();
    }

    if (loading) return <CircularProgress sx={{ color: "rgb(240, 247, 246)" }} />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={css.container}>
            <div className={css.containerWord}>
                {Array.from(word).map((letter, index) => (
                    <div key={index} className={css.contentCase}>
                        <div className={css.letter}>
                            {index < currentGuess.length ? currentGuess[index] : ''}
                        </div>
                    </div>
                ))}
            </div>
            <div className={css.containerAction}>
                <div className={css.contentIco} onClick={onValidate}>
                    <FaCheck className={css.ico} />
                </div>
                <div className={css.contentIco} onClick={onRemove}>
                    <FaDeleteLeft className={css.ico} />
                </div>
                <div className={css.contentIco} onClick={onRefresh}>
                    <FaArrowRotateLeft className={css.ico} />
                </div>
            </div>
        </div>
    );
};

export default Board;