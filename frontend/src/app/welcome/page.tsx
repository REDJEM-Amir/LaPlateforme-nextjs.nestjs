'use client'

import Board from "@/components/Board";
import KeyBoard from "@/components/KeyBoard";
import css from "@/styles/welcome.module.css";
import { useCallback, useState } from "react";

export default function () {
    const [currentGuess, setCurrentGuess] = useState('');

    const setInitialGuess = useCallback((letter: string) => {
        setCurrentGuess(letter);
    }, []);

    const handleKeyPress = useCallback((key: string) => {
        setCurrentGuess(prev => prev + key.toUpperCase());
    }, []);

    return (
        <div className={css.container}>
            <div className={css.contentOne}>
                <div className={css.contentRight} />
                <div className={css.contentMid}>
                    <Board currentGuess={currentGuess} setInitialGuess={setInitialGuess} />
                </div>
                <div className={css.contentLeft} />
            </div>
            <div className={css.contentTwo}>
                <KeyBoard onKeyPress={handleKeyPress} />
            </div>
        </div>
    );
}