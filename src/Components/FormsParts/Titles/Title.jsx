import React from 'react'

// заголовок вопроса

const Title = ({ children, number = null, required = false }) => {
  return (
    <p className='app__content_title'>
      {/* номер вопроса отображается, только если его передали */}
      {number ? <span className='numbering'>{number}</span> : null}
      {/* знак обязательного вопроса отображается, только если передали, что вопрос обязателен */}
      {children} {required ? <span className='red'>*</span> : null}
    </p>
  )
}

export default Title
