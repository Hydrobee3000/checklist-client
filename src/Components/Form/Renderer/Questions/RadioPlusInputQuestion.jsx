import React from 'react'
import { QuestionTitle, QuestionTitleRemark } from '../Titles/QuestionTitle' // заголовок/подзаголовок вопроса
import saveAnswersToState from '../../../../utils/saveAnswersToState' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName

// после выбора ответа - появляется инпут для ввода числа (номера локации)

const RadioPlusInputQuestion = ({
  dataQuestion, // данные вопроса
  setInputsValue, // функция установки значений ответов в стейт
  inputsValue, // введенные значения
  isReadonly = false, // включен ли режим чтения? -включается после отправки формы
  required = false, // является ли вопрос обязательным
  withAddition = false, // является ли вопрос составным? (с доп. вопросами)
  inputType,
}) => {
  let indexName = dataQuestion?.indexName // indexName вопроса. Пр: audioAlarm
  let numbering = dataQuestion?.order // нумерация вопроса
  let title = dataQuestion?.title?.text // сам текст вопроса
  let titleRemark = dataQuestion?.title?.remark // пометка к вопросу
  let mainAnswer = inputsValue[indexName] // ответ на вопрос (основной Пр: 'рудоскоп', доп. Пр: 'рудоскоп: 3')

  return (
    <>
      {withAddition === false ? (
        // отобразим заголовок и комментарий - только если у вопроса нет дополнительных вопросов
        <>
          <QuestionTitle number={numbering} required={required}>
            {title}
          </QuestionTitle>
          {title && <QuestionTitleRemark>{titleRemark}</QuestionTitleRemark>}
        </>
      ) : null}

      <div className='app__content_radio'>
        {/* Отображаем варианты ответов (радио кнопки)  */}

        {dataQuestion?.variants.map((el) => {
          return (
            <React.Fragment key={el.value}>
              <div className='app__content_radio-value'>
                <label className='app__content_radio-label'>
                  <input
                    className={'radio__input'}
                    type='radio'
                    name={indexName}
                    value={el.value}
                    onChange={(e) => {
                      mainAnswer = el.value
                      saveAnswersToState(setInputsValue, indexName, el.value, inputsValue)
                    }}
                    disabled={isReadonly}
                    required={required}
                  />
                  {/* вариант ответа */}
                  {el.value}
                </label>
              </div>

              {/* инпут отобразится только под выбранным ответом, у которого:
              в json установлено свойство additionalInput: true 
              и в json свойство value совпадает с выбранным ответом или начинается с выбранного ответа(для input)

              Пр: ответ на основной ? = 'рудоскоп', ответ на доп. ? = 'рудоскоп: 3') --- 'рудоскоп' = el.value 
              */}
              {(mainAnswer === el.value && el.additionalInput === true) ||
              (mainAnswer?.startsWith(el.value) && el.additionalInput === true) ? (
                <React.Fragment key={el.value}>
                  <QuestionTitleRemark>{`Введите название ${el?.value}${
                    el?.nounDeclension ?? '' // добавляет окончание, если оно передано
                  }`}</QuestionTitleRemark>
                  <input
                    onChange={(e) => {
                      saveAnswersToState(
                        setInputsValue,
                        indexName,
                        `${el.value}: ${e?.target?.value}` // устанавливаем зн-е и указываем к какому ответу относится - рудоскоп: 11
                      )
                    }}
                    className='app__content_input'
                    style={{ width: '50%' }}
                    placeholder={`введите название ${el?.value}${el?.nounDeclension ?? ''}`}
                    type={inputType || 'number'}
                    min='0'
                    disabled={isReadonly}
                    required={required}
                  />
                </React.Fragment>
              ) : null}
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}
export default RadioPlusInputQuestion
