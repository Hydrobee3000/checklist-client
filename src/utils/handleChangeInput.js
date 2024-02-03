import { allAdditionalIndexes } from '../constants/additionalIndexes'

// записывает в стейт(inputsValue) ответы на все вопросы с их indexName

const handleChangeInput = (
  setInputsValue, // установить значение ответа в стейт
  indexName, // переданный indexName вопроса (основного или дополнительного Пр.: audioAlarm || audioAlarmDop)
  e, // само введенное или переданное значение
  inputsValue = null, // стейт; объект со всеми ответами с их indexName
  mainQuestionIndex = '' // (string) Пример: 'audioAlarm' (передаётся !только при ответе на Дополнительный вопрос)
) => {
  /* Oсновной вопрос */

  if (!mainQuestionIndex) {
    // установка значения ответа на основной вопрос в стейт. Пример: { audioAlarm: 'Не требуется' }
    setInputsValue((prev) => ({
      ...prev, // копируем предыдущие значения ответов
      [indexName]: e?.target?.value ? e.target.value : e, // добавляем новое значение ответа к предыдущим
    }))

    // если inputsValue не пустой - удалим из стейта данные ответов на дополнительные вопросы
    if (inputsValue) {
      allAdditionalIndexes.map((el) => delete inputsValue[`${indexName}${el}`])
    }

    /* Дополнительный вопрос */
  } else {
    // установим значение ответа на доп. вопрос в стейт. Пример: { audioAlarmWorkStop: 'Работы остановил' }
    setInputsValue((prev) => ({
      ...prev,
      [indexName]: e?.target?.value ? e.target.value : e, // если есть введенное значение (инпуты) - запишем его, иначе - готовый ответ
    }))
  }
}

export default handleChangeInput
