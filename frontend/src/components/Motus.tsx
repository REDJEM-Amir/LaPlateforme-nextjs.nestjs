'use client';

import { useEffect, useState, useCallback } from "react";
import GameBoard from "./GameBoard";
import axios from "axios";
import css from '@/styles/motus.module.css'
import { HiArrowSmallUp } from "react-icons/hi2";
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from "@mui/material/CircularProgress";

type GuessResult = {
    letter: string;
    status: 'correct' | 'wrong-place' | 'wrong' | 'empty';
};

type Guess = GuessResult[];

const Motus: React.FC = () => {
    const [secretWord, setSecretWord] = useState<string>('');
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCell, setCurrentCell] = useState(1);
    const [firstConnect, setFirstConnect] = useState<boolean>();
    const [username, setUsername] = useState<string>();
    const [loadSubmit, setLoadSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        init();
    });

    const init = async () => {
        const response = await axios.get('api/account/init')
        console.log(response.data.status);
        if (response.data.status == 200) {
            setFirstConnect(true);
            setIsLoading(false);
        } else {
            setFirstConnect(false);
            setIsLoading(false);
        }
    }

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadSubmit(true);
        try {
            const body = { username: username }
            const response = await axios.post('api/account/signup', body);
            console.log('signup', response.data.status);
            if (response.data.status == 200) {
                setFirstConnect(false);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
        setLoadSubmit(false);
    }

    const handleKeyPress = useCallback((key: string) => {
        if (key.match(/^[A-Za-z]$/) && currentCell < secretWord.length) {
            const updatedGuesses: Guess[] = [...guesses];
            const currentGuess: GuessResult[] = updatedGuesses[currentRow];

            if (currentCell > 0 && currentCell < currentGuess.length) {
                currentGuess[currentCell] = { letter: key.toUpperCase(), status: 'empty' };
            }
            setGuesses(updatedGuesses);
            setCurrentCell(currentCell + 1);
        } else if (key === 'Backspace' && currentCell > 1) {
            const updatedGuesses: Guess[] = [...guesses];
            const currentGuess: GuessResult[] = updatedGuesses[currentRow];

            const previousCell = currentCell - 1;
            currentGuess[previousCell] = { letter: '', status: 'empty' };
            setGuesses(updatedGuesses);
            setCurrentCell(previousCell);
        }
    }, [guesses, currentRow, currentCell, secretWord.length]);

    const handleRandomApi = () => {
        axios.get("https://trouve-mot.fr/api/random")
            .then(response => {
                const fetchedWord = response.data[0].name.toUpperCase();
                setSecretWord(fetchedWord);
                setGuesses(
                    Array.from({ length: 6 }, () =>
                        Array.from({ length: fetchedWord.length }, (_, index) => ({
                            letter: index === 0 ? fetchedWord[0] : '',
                            status: 'empty'
                        }))
                    )
                );
            })
            .catch(error => {
                console.error('Error fetching word:', error);
                alert('Erreur lors de la récupération du mot');
            });
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e.key);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyPress]);

    const checkGuess = () => {
        const currentGuess: string = guesses[currentRow].map(gr => gr.letter).join('');

        if (currentGuess.length < secretWord.length) {
            alert("Vous devez remplir toutes les lettres avant de soumettre.");
            return;
        }

        const letterCount = new Map();
        for (let char of secretWord) {
            letterCount.set(char, (letterCount.get(char) || 0) + 1);
        }
        const result: Guess = currentGuess.split('').map((letter, i) => {
            if (letter === secretWord[i]) {
                letterCount.set(letter, letterCount.get(letter) - 1);
                return { letter, status: 'correct' };
            }
            return { letter, status: 'empty' };
        });
        result.forEach((res, idx) => {
            if (res.status === 'empty') {
                if (letterCount.get(res.letter) > 0) {
                    res.status = 'wrong-place';
                    letterCount.set(res.letter, letterCount.get(res.letter) - 1);
                } else {
                    res.status = 'wrong';
                }
            }
        });
        setGuesses(guesses => {
            const updatedGuesses = [...guesses];
            updatedGuesses[currentRow] = result;
            return updatedGuesses;
        });
        if (result.every(r => r.status === 'correct')) {
            alert('Félicitations! Vous avez deviné le mot!');
        } else if (currentRow < guesses.length - 1) {
            setCurrentRow(currentRow + 1);
            setCurrentCell(1);
        } else {
            alert(`Dommage! Le mot était ${secretWord}.`);
        }
    };

    return (
        <div className={css.containerMotus}>
            {isLoading ? (
                <CircularProgress
                    sx={{
                        alignSelf: 'center',
                    }} />
            ) : (
                firstConnect ? (
                    <div className={css.contentForm}>
                        <form className={css.from} onSubmit={signup}>
                            <TextField label='Username' type='text' placeholder='Saisissez un surnom' onChange={(e) => setUsername(e.target.value)} required />
                            <LoadingButton variant="outlined" type='submit' loading={loadSubmit}>
                                Valider
                            </LoadingButton>
                        </form>
                    </div>
                ) : (
                    guesses.length === 0 ? (
                        <div className={css.contentStart} onClick={handleRandomApi}>
                            <div className={css.textStart}>Play</div>
                        </div>
                    ) : (
                        <>
                            <GameBoard guesses={guesses} />
                            <div className={css.contentSubmit} onClick={checkGuess}>
                                <HiArrowSmallUp className={css.submit} />
                            </div>
                        </>
                    )
                )
            )}
        </div>
    );
};

export default Motus;
