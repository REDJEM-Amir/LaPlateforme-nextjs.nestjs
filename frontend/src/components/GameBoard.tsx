import '@/styles/gameboard.css';

type GuessResult = {
    letter: string;
    status: 'correct' | 'wrong-place' | 'wrong' | 'empty';
};

type Guess = GuessResult[];

interface GameBoardProps {
    guesses: Guess[];
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses }) => {
    return (
        <div className="game-board">
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