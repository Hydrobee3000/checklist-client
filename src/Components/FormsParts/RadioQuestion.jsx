import { useEffect, useState } from 'react'
import handleChangeInput from '../../utils/handleChangeInput' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName
import Title from './Titles/Title' // заголовок вопроса
import TitleComment from './Titles/TitleComment' // подзаголовок вопроса

// вопрос с выбором одного ответа (или множесва ответов при переданном параметре multiple)

const RadioQuestion = ({
  dataQuestion, // данные вопроса
  setInputsValue, // функция установки значений ответов в стейт
  inputsValue, // введенные значения
  isReadonly = false, // включен ли режим чтения? -включается после отправки формы
  required = false, // является ли вопрос обязательным
  multiple = false, // поддерживает ли выбор нескольких вариантов ответа
  withAddition = false, // является ли вопрос составным? (с доп. вопросами)
}) => {
  let indexName = dataQuestion?.indexName // indexName вопроса. Пр: audioAlarm
  let questionTitle = dataQuestion?.title // данные заголовка вопроса
  let questionComment = dataQuestion?.titleRemark // пометка к вопросу
  let numbering = dataQuestion?.order // нумерация вопроса

  const [selectedMultipleValues, setSelectedMultipleValues] = useState('') // (multiple) состояние для множественных выборов основного ответа

  const handleRadioChange = (event) => {
    const value = event.target.value

    if (multiple) {
      // Множественный выбор
      setSelectedMultipleValues((prevValues) => {
        // Разбиваем строку с предыдущими значениями по запятой и удаляем пробелы в начале и конце каждого элемента
        const valuesArray = prevValues.split(',').map((item) => item.trim())

        if (event.target.checked) {
          // Если элемент выбран, добавляем его в массив значений
          valuesArray.push(value)
        } else {
          // Если элемент убран, удаляем его из массива значений
          const index = valuesArray.indexOf(value)
          if (index !== -1) {
            valuesArray.splice(index, 1)
          }
        }
        // Удаляем пустые элементы (возможные после удаления выбранных значений) и объединяем элементы массива в строку, разделяя запятой с пробелом

        return valuesArray.filter((item) => item !== '').join(', ')
      })
    } else {
      // Одиночный выбор
      handleChangeInput(setInputsValue, indexName, value, inputsValue)
    }
  }

  useEffect(() => {
    if (multiple) {
      // отправка в стейт актуальных выбранных ответов
      handleChangeInput(setInputsValue, indexName, selectedMultipleValues, inputsValue)
    }
  }, [selectedMultipleValues])

  return (
    <>
      {/* отобразим заголовок и комментарий - только если у вопроса нет дополнительных вопросов */}
      {withAddition === false ? (
        <>
          <Title number={numbering} required={required}>
            {questionTitle}
          </Title>
          <TitleComment>{questionComment}</TitleComment>
        </>
      ) : null}

      <div className='app__content_radio'>
        {/* Отображаем варианты ответов (радио кнопки или при множественном выборе чекбоксы)  */}

        {dataQuestion.radio.map((el) => {
          return (
            <div key={el.value} className='app__content_radio-value'>
              <label className='app__content_radio-label'>
                <input
                  className='radio__input'
                  type={multiple ? 'checkbox' : 'radio'} // если множественный выбор - тогда тип чекбокс
                  name={indexName}
                  value={el.value}
                  onChange={handleRadioChange}
                  disabled={isReadonly}
                  required={multiple ? !selectedMultipleValues : required}
                />
                {el.value}
              </label>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default RadioQuestion
