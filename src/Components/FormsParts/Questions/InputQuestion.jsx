import React from 'react'
import { setPlaceholder } from '../../../utils/setPlaceholder' // настройка надписи внутри поля ввода
import { Title, TitleRemark } from '../Titles/Title' // заголовок/подзаголовок вопроса
import saveAnswersToState from '../../../utils/saveAnswersToState' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName

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
  let title = dataQuestion?.title?.text // данные заголовка вопроса
  let titleRemark = dataQuestion?.title?.remark // пометка к вопросу
  let numbering = dataQuestion?.order // нумерация вопроса

  // если у объекта вопроса есть свойство 'placeholder' - используем значение оттуда, иначе - значение по умолчанию
  let placeholder = setPlaceholder(dataQuestion)

  /* отобразим обычный инпут */
  if (textarea === false) {
    return (
      <>
        <Title number={numbering} required={required}>
          {title}
        </Title>
        {title && <TitleRemark>{titleRemark}</TitleRemark>}

        {/* поле ввода ответа */}
        <input
          onChange={(e) => {
            saveAnswersToState(setInputsValue, indexName, e)
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
          {title}
        </Title>
        {title && <TitleRemark>{titleRemark}</TitleRemark>}

        {/* поле ввода ответа */}
        <textarea
          className='app__content_input'
          style={{ resize: 'none' }}
          onChange={(e) => {
            saveAnswersToState(setInputsValue, indexName, e)
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
