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
    const [attempts, setAttempts] = useState<number>(0);
    const [validationResult, setValidationResult] = useState<string[]>([]);

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
        const correctGuesses: string[] = [];
        const misplacedGuesses: string[] = [];
        const incorrectGuesses: string[] = [];
        
        for (let i = 0; i < currentGuess.length; i++) {
            const guess = currentGuess[i];
            if (guess === word[i]) {
                correctGuesses.push(guess);
            } else if (word.includes(guess)) {
                misplacedGuesses.push(guess);
            } else {
                incorrectGuesses.push(guess);
            }
        }

        setValidationResult(correctGuesses.concat(misplacedGuesses).concat(incorrectGuesses));

        if (currentGuess === word) {
            setAttempts(0);
            load();
        } else {
            setAttempts(prevAttempts => prevAttempts + 1);
        }
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

    function getLetterColor(index: number): string {
        if (index < currentGuess.length) {
            if (validationResult[index] === currentGuess[index]) {
                return 'red'; // Lettre correctement placée
            } else if (validationResult.includes(currentGuess[index])) {
                return 'yellow'; // Lettre mal placée
            } else {
                return 'blue'; // Lettre incorrecte
            }
        }
        return 'transparent'; // Aucune lettre à cet index
    }


    if (loading) return <CircularProgress sx={{ color: "rgb(240, 247, 246)" }} />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={css.container}>
            {Array.from({ length: 6 }, (_, rowIndex) => (
                <div key={rowIndex} className={css.containerWord}>
                    {Array.from({ length: 6 }, (_, colIndex) => (
                        <div key={colIndex} className={css.contentCase}>
                            <div className={css.letter}>
                                {(rowIndex * 6) + colIndex < currentGuess.length ? currentGuess[(rowIndex * 6) + colIndex] : ''}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
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