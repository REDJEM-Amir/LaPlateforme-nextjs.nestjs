'use client';

import { createRef, useEffect } from "react";
import '@/styles/cell.css';

type GuessResult = {
    letter: string;
    status: 'correct' | 'wrong-place' | 'wrong';
};

interface CellProps {
    guessResult: GuessResult;
    isCurrent: boolean;
    onKeyPress: (letter: string) => void;
}

const Cell: React.FC<CellProps> = ({ guessResult, isCurrent, onKeyPress }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const letter = e.key.toUpperCase();
        if (letter.length === 1 && letter >= 'A' && letter <= 'Z') {
            onKeyPress(letter);
        }
    };

    useEffect(() => {
        if (isCurrent) {
            cellRef.current?.focus();
        }
    }, [isCurrent]);

    const cellRef = createRef<HTMLDivElement>();

    return (
        <div
            ref={cellRef}
            className={`cell ${guessResult.status}`}
            tabIndex={0}
            onKeyDown={isCurrent ? handleKeyDown : undefined}
        >
            {guessResult.letter}
        </div>
    );
};

export default Cell;
