import React from 'react'
import css from '@/styles/keyBoard.module.css';

const Key = ({
    label
}:{
    label: string
}) => {
  return (
    <div className={css.contentKey}>
        <div className={css.key}>{label}</div>
    </div>
  )
}

export default Key