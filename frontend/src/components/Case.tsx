import React from 'react'
import css from '@/styles/case.module.css';

const Case = ({
    letter
}:{
    letter: string
}) => {
  return (
    <div className={css.container}>
        <div className={css.content}>
            <div className={css.word}>{letter}</div>
        </div>
    </div>
  )
}

export default Case