import React from 'react'
import { OTHER } from '../../../constants/additionalIndexes' // индекс доп. ответа: 'Other'
import { Title, TitleRemark } from '../Titles/Title' // заголовок/подзаголовок вопроса
import saveAnswersToState from '../../../utils/saveAnswersToState' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName

// дополнительный блок "Замечания по отклонениям"

const RemarksOnDeviation = ({
  checkboxDop, // данные checkbox'ов для доп. вопроса
  indexName, // [indexName] основного вопроса(string). Пр: audioAlarm
  inputsValue, // введенные значения
  setInputsValue, // функция установки значений ответов в стейт
  isReadonly, // включен ли режим чтения? -включается после отправки формы
  isChosenAdditionalAnswer, // выбран ли хоть один ответ на доп. вопрос
  currentNumbering, // нумерация вопроса / блока
  require, // является ли блок обязательным
}) => {
  let blockComment = checkboxDop?.remark

  return (
    <div className='block__remark_deviation'>
      <Title number={currentNumbering} required={require === false ? false : true}>
        Замечания по отклонению
      </Title>
      {/* если в json не указан комментарий (remark) - отобразим дефолтное значение, иначе - его значение */}
      <TitleRemark>{blockComment ?? null}</TitleRemark>

      {/* поле ввода */}
      <textarea
        key={checkboxDop.name}
        className='app__content_input'
        style={{ resize: 'none', width: '100%' }}
        onChange={(e) => {
          saveAnswersToState(setInputsValue, `${indexName}${OTHER}`, e, inputsValue, indexName)
        }}
        rows='3'
        placeholder='поле для ввода вашего замечания'
        disabled={isReadonly}
        // блок необязательный - только если передан параметр (require: false)
        required={require === false ? false : true}
      />
    </div>
  )
}

export default RemarksOnDeviation
