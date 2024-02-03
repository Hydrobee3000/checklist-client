import React from 'react'
import handleChangeInput from '../../utils/handleChangeInput' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName
import Title from './Titles/Title' // заголовок вопроса
import TitleComment from './Titles/TitleComment' // подзаголовок вопроса

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
  let questionTitle = dataQuestion?.question // данные заголовка вопроса
  let questionComment = dataQuestion?.questionRemark // пометка к вопросу
  let mainAnswer = inputsValue[indexName] // ответ на вопрос (основной Пр: 'рудоскоп', доп. Пр: 'рудоскоп: 3')
  let numbering = dataQuestion?.numbering // нумерация вопроса

  return (
    <>
      {withAddition === false ? (
        // отобразим заголовок и комментарий - только если у вопроса нет дополнительных вопросов
        <>
          <Title number={numbering} required={required}>
            {questionTitle}
          </Title>
          <TitleComment>{questionComment}</TitleComment>
        </>
      ) : null}

      <div className='app__content_radio'>
        {/* Отображаем варианты ответов (радио кнопки)  */}

        {dataQuestion.radio.map((el) => {
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
                      handleChangeInput(setInputsValue, indexName, el.value, inputsValue)
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
                  <TitleComment>{`Введите название ${el?.value}${
                    el?.nounDeclension ?? '' // добавляет окончание, если оно передано
                  }`}</TitleComment>
                  <input
                    onChange={(e) => {
                      handleChangeInput(
                        setInputsValue,
                        indexName,
                        `${el.value}: ${e?.target?.value}` // устанавливаем зн-е и указываем к какому ответу относится - рудоскоп: 11
                      )
                    }}
                    className='app__content_input'
                    style={{ width: '50%' }}
                    placeholder={`введите название ${el?.value}${
                      el?.nounDeclension ?? ''
                    }`}
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
