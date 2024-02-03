import React from 'react'

// заголовок блока вопросов (Пр.:  Смертельный риск — 7 - Электрический ток)

export const BlockTitle = ({ children, number = null }) => {
  return (
    <h2 className='app__block_title'>
      {/* если у заголовка есть нумерация - она отобразится с отступом, иначе - только текст без нумерациии и отступов */}
      {number ? <span className='block_title__number'>{number + '.'}</span> : null}

      {children}
    </h2>
  )
}

// комментарий блока вопросов

export const BlockTitleComment = ({ children }) => {
  return <p className='app__title_dop'>{children}</p>
}
