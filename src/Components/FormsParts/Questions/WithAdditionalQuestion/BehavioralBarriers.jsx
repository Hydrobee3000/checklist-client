import saveAnswersToState from '../../../../utils/saveAnswersToState' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName

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

export default BehavioralBarriers
