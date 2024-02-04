import React from 'react'
import handleChangeInput from '../../utils/handleChangeInput' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName
import Title from './Titles/Title' // заголовок вопроса
import TitleComment from './Titles/TitleComment' // подзаголовок вопроса

// вопрос с выпадающим списком

export default function SelectQuestion({
  dataQuestion, // данные вопроса
  setInputsValue, // функция установки значений ответов в стейт
  form, // название формы
  isReadonly = false, // включен ли режим чтения? -включается после отправки формы
  required = false, // является ли вопрос обязательным
}) {
  let indexName = dataQuestion?.indexName // indexName вопроса. Пр: audioAlarm
  let questionTitle = dataQuestion?.title // сам текст вопроса
  let questionComment = dataQuestion?.titleRemark // пометка к вопросу
  let numbering = dataQuestion?.order // нумерация вопроса

  return (
    <>
      <Title number={numbering} required={required}>
        {questionTitle}
      </Title>
      <TitleComment>{questionComment}</TitleComment>

      {/* выбор варианта ответа */}
      <select
        className='app__content_input'
        name={indexName}
        form={form}
        disabled={isReadonly}
        required={required}
        onChange={(e) => handleChangeInput(setInputsValue, indexName, e.target.value)}
      >
        {/* Вариант по умолчанию (видимый текст) */}
        <option value='' disabled selected>
          Выберите из списка
        </option>
        {/* отображаем все варианты ответов в окне выбора  */}

        {dataQuestion.select.map((el) => {
          return (
            <option key={el.value} value={el.value}>
              {el.value}
            </option>
          )
        })}
      </select>
    </>
  )
}
