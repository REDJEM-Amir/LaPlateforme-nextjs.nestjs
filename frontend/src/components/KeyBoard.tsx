import React from 'react'
import css from '@/styles/keyBoard.module.css'

const KeyBoard = () => {
    return (
        <div className={css.container}>
            <div className={css.rowOne}>
                <div className={css.contentKey}>
                    <div className={css.key}>A</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>Z</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>E</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>R</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>T</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>Y</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>U</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>I</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>O</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>P</div>
                </div>
            </div>
            <div className={css.rowTwo}>
                <div className={css.contentKey}>
                    <div className={css.key}>Q</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>S</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>D</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>F</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>G</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>H</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>J</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>K</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>L</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>M</div>
                </div>
            </div>
            <div className={css.rowThree}>
                <div className={css.contentKey}>
                    <div className={css.key}>W</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>X</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>C</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>V</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>B</div>
                </div>
                <div className={css.contentKey}>
                    <div className={css.key}>N</div>
                </div>
            </div>
        </div>
    )
}

export default KeyBoard