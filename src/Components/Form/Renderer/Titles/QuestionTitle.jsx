import React from 'react'

// заголовок вопроса

export const QuestionTitle = ({ children, number = null, required = false }) => {
  return (
    <p className='app__content_title'>
      {/* номер вопроса отображается, только если его передали */}
      {number ? <span className='numbering'>{number}</span> : null}
      {/* знак обязательного вопроса отображается, только если передали, что вопрос обязателен */}
      {children} {required ? <span className='red'>*</span> : null}
    </p>
  )
}

// комментарий вопроса

export const QuestionTitleRemark = ({ children }) => {
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
