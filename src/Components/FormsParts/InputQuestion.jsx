import React from 'react'
import handleChangeInput from '../../utils/handleChangeInput' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName
import Title from './Titles/Title' // заголовок вопроса
import TitleComment from './Titles/TitleComment' // подзаголовок вопроса
import { setPlaceholder } from '../../utils/setPlaceholder' // настройка надписи внутри поля ввода

// вопрос с полем ввода (текста/числа/даты) для ответа

const InputQuestion = ({
  dataQuestion, // данные вопроса
  setInputsValue, // функция установки значений ответов в стейт
  defaultValue, // значение по-умолчанию
  textarea = false, // false = input \ true = textare
  isReadonly = false, // включен ли режим чтения? -включается после отправки формы
  required = false, // является ли вопрос обязательным
}) => {
  let indexName = dataQuestion?.indexName // indexName вопроса. Пр: audioAlarm
  let type = dataQuestion?.type // тип инпута (number, date ...)
  let questionTitle = dataQuestion?.title // данные заголовка вопроса
  let questionComment = dataQuestion?.titleRemark // пометка к вопросу
  let numbering = dataQuestion?.order // нумерация вопроса

  // если у объекта вопроса есть свойство 'placeholder' - используем значение оттуда, иначе - значение по умолчанию
  let placeholder = setPlaceholder(dataQuestion)

  /* отобразим обычный инпут */
  if (textarea === false) {
    return (
      <>
        <Title number={numbering} required={required}>
          {questionTitle}
        </Title>
        <TitleComment>{questionComment}</TitleComment>

        {/* поле ввода ответа */}
        <input
          onChange={(e) => {
            handleChangeInput(setInputsValue, indexName, e)
          }}
          className='app__content_input'
          placeholder={placeholder}
          type={type}
          min={type === 'number' ? '0' : null} // нельзя ввести отрицательные зн-я в числовом input'е
          disabled={isReadonly}
          required={required}
          defaultValue={defaultValue}
        />
      </>
    )

    /* отобразим textarea */
  } else if (textarea === true) {
    return (
      <>
        <Title number={numbering} required={required}>
          {questionTitle}
        </Title>
        <TitleComment>{questionComment}</TitleComment>

        {/* поле ввода ответа */}
        <textarea
          className='app__content_input'
          style={{ resize: 'none' }}
          onChange={(e) => {
            handleChangeInput(setInputsValue, indexName, e)
          }}
          rows='6'
          placeholder='Введите значение'
          disabled={isReadonly}
          required={required}
          defaultValue={defaultValue}
        />
      </>
    )
  }
}

export default InputQuestion
