import RadioQuestion from './RadioQuestion'
import saveAnswersToState from '../../../../utils/saveAnswersToState' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName
import { QuestionTitle, QuestionTitleRemark } from '../Titles/QuestionTitle' // заголовок/подзаголовок вопроса
import { hasAtLeastOneChosenAdditionalAnswer } from '../../../../utils/isChosenAdditionalAnswer' // выбран ли хотя бы один ответ на доп. вопрос
import { OTHER } from '../../../../constants/additionalIndexes' // (string) "Other"

// вопрос, где при выборе ответа 'нет' - появляется доп. вопрос

const WithAdditionalQuestion = ({
  dataQuestion, // данные основного вопроса
  setInputsValue, // функция установки значений ответов в стейт
  inputsValue, // введенные значения
  isReadonly = false, // включен ли режим чтения? -включается после отправки формы
  required = false,
}) => {
  let dataQuestionDop = dataQuestion.additionalQuestion // данные дополнительного вопроса

  let indexName = dataQuestion.indexName // [indexName] основного вопроса(string). Пр: audioAlarm
  let indexNameDop = dataQuestionDop.indexName //  [indexName]Dop дополнительного вопроса(string). Пр: audioAlarmDop

  let title = dataQuestion?.title?.text // сам текст вопроса
  let titleRemark = dataQuestion?.title?.remark // пометка к вопросу

  let currentNumbering = dataQuestion?.order // нумерация вопроса
  let mainAnswer = inputsValue[indexName] // ответ на основной вопрос ("Да" | "Нет" | "Не требуется")

  return (
    <>
      <QuestionTitle number={currentNumbering} required>
        {title}
      </QuestionTitle>
      {title && <QuestionTitleRemark>{titleRemark}</QuestionTitleRemark>}

      {/* основной вопрос */}
      <RadioQuestion
        dataQuestion={dataQuestion}
        setInputsValue={setInputsValue}
        inputsValue={inputsValue}
        isReadonly={isReadonly}
        required
        withAddition // вопрос является с доп. вопросами - не будет отображаться повторный заголовок
      />
      {/* если ответ на основной вопрос: 'Нет' - отобразится доп. вопрос */}

      {mainAnswer === 'Нет' ? (
        <div className='app__content_radio'>
          <QuestionTitle number={currentNumbering} required>
            Поведенческие барьеры (ваши действия)
          </QuestionTitle>

          {/* отобразим ДОП. вопросы */}
          {dataQuestionDop.checkbox.map((checkboxDop) => {
            // если параметр {indexName}Other - Отобразим блок *Замечания по отклонению* (единственный блок с инпутом)
            if (checkboxDop.name === `${indexName}${OTHER}`) {
              let isRequired = checkboxDop?.require === false ? false : true

              return (
                <RemarksOnDeviation
                  key={checkboxDop.name}
                  checkboxDop={checkboxDop}
                  indexName={indexName}
                  inputsValue={inputsValue}
                  setInputsValue={setInputsValue}
                  isReadonly={isReadonly}
                  isChosenAdditionalAnswer={hasAtLeastOneChosenAdditionalAnswer}
                  currentNumbering={currentNumbering}
                  require={isRequired}
                />
              )
            } else {
              // иначе - отобразим блок *Поведенческие барьеры*  (чекбоксы)
              return (
                <BehavioralBarriers
                  key={checkboxDop.name}
                  checkboxDop={checkboxDop}
                  indexName={indexName}
                  indexNameDop={indexNameDop}
                  inputsValue={inputsValue}
                  setInputsValue={setInputsValue}
                  isReadonly={isReadonly}
                  isChosenAdditionalAnswer={hasAtLeastOneChosenAdditionalAnswer}
                />
              )
            }
          })}
        </div>
      ) : // если ответ на основной вопрос не 'Нет' - доп. вопросы не отображаются
      null}
    </>
  )
}

//
//
//

// дополнительный блок "Замечания по отклонениям"  // блок доп. ответа *Замечания по отклонению*

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
      <QuestionTitle number={currentNumbering} required={require === false ? false : true}>
        Замечания по отклонению
      </QuestionTitle>
      {/* если в json не указан комментарий (remark) - отобразим дефолтное значение, иначе - его значение */}
      <QuestionTitleRemark>{blockComment ?? null}</QuestionTitleRemark>

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

//
//
//

// блок "Поведенческие барьеры" в дополнительных вопросах

const BehavioralBarriers = ({
  checkboxDop, // данные checkbox'ов для доп. вопроса
  indexName, // [indexName] основного вопроса(string). Пр: audioAlarm
  indexNameDop, //  [indexName]Dop дополнительного вопроса(string). Пр: audioAlarmDop
  inputsValue, // введенные значения
  setInputsValue, // функция установки значений ответов в стейт
  isReadonly, // включен ли режим чтения? -включается после отправки формы
  isChosenAdditionalAnswer, // выбран ли хоть один ответ на доп. вопрос
}) => {
  return (
    <div className='app__content_radio-value'>
      <label className='app__content_radio-label'>
        <input
          className='radio__input'
          type='checkbox'
          name={indexNameDop}
          value={checkboxDop.name}
          onChange={(e) => {
            // если чекбокс нажат - передадим значение этого ответа
            saveAnswersToState(
              setInputsValue,
              checkboxDop.name,
              e.target.checked ? checkboxDop.value : null,
              inputsValue,
              indexName
            )
          }}
          disabled={isReadonly}
          // обязательно выбрать хотя бы одно поле
          required={!isChosenAdditionalAnswer(inputsValue, indexName)}
        />
        {/* ответ на доп. вопрос. (Пр.: Работы остановил) */}
        {checkboxDop.value}
      </label>
    </div>
  )
}

export default WithAdditionalQuestion
