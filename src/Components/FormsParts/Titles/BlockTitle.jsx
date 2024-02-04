import React from 'react'

// заголовок блока вопросов (Пр.:  Смертельный риск — 7 - Электрический ток)

export const BlockTitle = ({ children = null, order = null }) => {
  return (
    <h2 className='app__block_title'>
      {/* если у заголовка есть нумерация - она отобразится с отступом, иначе - только текст без нумерациии и отступов */}
      {order && <span className='block_title__number'>{order + '.'}</span>}

      {children}
    </h2>
  )
}

// комментарий блока вопросов

export const BlockTitleComment = ({ children = null }) => {
  return children && <p className='app__title_dop'>{children}</p>
}
