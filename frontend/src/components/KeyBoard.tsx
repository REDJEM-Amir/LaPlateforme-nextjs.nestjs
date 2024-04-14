import React from 'react'
import css from '@/styles/keyBoard.module.css'
import Key from './Key';

const KeyBoard = ({
    onKeyPress
}:{
    onKeyPress: (key: string) => void
}) => {
    const rowOneKeys = ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const rowTwoKeys = ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];
    const rowThreeKeys = ['W', 'X', 'C', 'V', 'B', 'N'];

    return (
        <div className={css.container}>
            <div className={css.rowOne}>
                {rowOneKeys.map(key => (
                    <Key key={key} label={key} onClick={() => onKeyPress(key)} />
                ))}
            </div>
            <div className={css.rowTwo}>
                {rowTwoKeys.map(key => (
                    <Key key={key} label={key} onClick={() => onKeyPress(key)} />
                ))}
            </div>
            <div className={css.rowThree}>
                {rowThreeKeys.map(key => (
                    <Key key={key} label={key} onClick={() => onKeyPress(key)} />
                ))}
            </div>
        </div>
    );
}

export default KeyBoard