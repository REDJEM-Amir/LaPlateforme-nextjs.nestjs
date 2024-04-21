import '@/styles/gameboard.css';
import { useRef } from 'react';

type GuessResult = {
    letter: string;
    status: 'correct' | 'wrong-place' | 'wrong' | 'empty';
};

type Guess = GuessResult[];

interface GameBoardProps {
    guesses: Guess[];
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBoardClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="game-board" onClick={handleBoardClick}>
            <input
                ref={inputRef}
                type="text"
                className="hidden-input"
                aria-hidden="true"
                readOnly
            />
            {guesses.map((guess, rowIndex) => (
                <div key={rowIndex} className="attempt">
                    {guess.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`cell ${cell.status}`}>
                            {cell.letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;