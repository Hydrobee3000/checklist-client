import React from 'react'
import { Title, TitleRemark } from './Titles/Title' // заголовок/подзаголовок вопроса
import saveAnswersToState from '../../utils/saveAnswersToState' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName

// вопрос с выпадающим списком

export default function SelectQuestion({
  dataQuestion, // данные вопроса
  setInputsValue, // функция установки значений ответов в стейт
  form, // название формы
  isReadonly = false, // включен ли режим чтения? -включается после отправки формы
  required = false, // является ли вопрос обязательным
}) {
  let indexName = dataQuestion?.indexName // indexName вопроса. Пр: audioAlarm
  let title = dataQuestion?.title?.text // сам текст вопроса
  let titleRemark = dataQuestion?.title?.remark // пометка к вопросу
  let numbering = dataQuestion?.order // нумерация вопроса

  return (
    <>
      <Title number={numbering} required={required}>
        {title}
      </Title>
      {title && <TitleRemark>{titleRemark}</TitleRemark>}

      {/* выбор варианта ответа */}
      <select
        className='app__content_input'
        name={indexName}
        form={form}
        disabled={isReadonly}
        required={required}
        onChange={(e) => saveAnswersToState(setInputsValue, indexName, e.target.value)}
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
