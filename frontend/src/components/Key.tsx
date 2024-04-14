import React from 'react'
import css from '@/styles/keyBoard.module.css';

const Key = ({
    label,
    onClick
}:{
    label: string,
    onClick: (key: string) => void
}) => {
  return (
    <div className={css.contentKey} onClick={() => onClick(label)}>
        <div className={css.key}>{label}</div>
    </div>
  )
}

export default Key