import { OTHER } from '../../../constants/additionalIndexes' // (string) "Other"
import { hasAtLeastOneChosenAdditionalAnswer } from '../../../utils/isChosenAdditionalAnswer' // выбран ли хотя бы один ответ на доп. вопрос
import { Title, TitleRemark } from '../Titles/Title' // заголовок/подзаголовок вопроса
import RadioQuestion from '../RadioQuestion'
import BehavioralBarriers from './BehavioralBarriers' // блок доп. ответа *Поведенческие барьеры*
import RemarksOnDeviation from './RemarksOnDeviation' // блок доп. ответа *Замечания по отклонению*

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
      <Title number={currentNumbering} required>
        {title}
      </Title>
      {title && <TitleRemark>{titleRemark}</TitleRemark>}

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
          <Title number={currentNumbering} required>
            Поведенческие барьеры (ваши действия)
          </Title>

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
export default WithAdditionalQuestion
