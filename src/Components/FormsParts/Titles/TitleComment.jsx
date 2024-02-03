import React from 'react'

// комментарий вопроса

const TitleComment = ({ children }) => {
  let isMulticolumnQuestionComment = Array.isArray(children) // является ли переданное значение массивом

  /* если передан массив - отобразим каждый элемент на новой строке */
  if (children && isMulticolumnQuestionComment === true) {
    const multicolumnComment = children.map((el, i) => {
      return <span key={i}>{el}</span>
    })

    return <p className='app__title_dop'>{multicolumnComment}</p>
    /* если передан комментарий и НЕ массив - отобразим в одну строку */
  } else if (children) {
    return <p className='app__title_dop'>{children}</p>
    // если комментарий не передан
  } else {
    return null
  }
}

export default TitleComment
