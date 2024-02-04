import { allAdditionalIndexes } from '../constants/additionalIndexes'

/**
 * Сохранение в стейт(inputsValue) ответов на все вопросы с их indexName
 *
 * @param {Function} setInputsValue - Установка значения ответа в стейт
 * @param {String} indexName - Отправлена ли форма
 * @param {Event} e - Только ли для просмотра форма
 * @param {Array} inputsValue - Cтейт;
 * @param {String} mainQuestionIndex - Содержит indexName основного вопроса
 *
 * @returns {void} - Сумма двух чисел.
 *
 */

const saveAnswersToState = (setInputsValue, indexName, e, inputsValue = null, mainQuestionIndex = '') => {
  /* Oсновной вопрос */

  if (!mainQuestionIndex) {
    // установка значения ответа на основной вопрос в стейт. Пример: { audioAlarm: 'Не требуется' }
    setInputsValue((prev) => ({
      ...prev,
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

export default saveAnswersToState
