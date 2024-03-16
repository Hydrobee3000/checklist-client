import { checkAPI } from '../Api/Api'
import { requestsBroadcast } from './serviceWorkerMessages' // канал для связи с Service Worker

// отправка заполненной формы

/**
 * Функция отправки формы на сервер и передачи service-worker'у информации о запросе.
 *
 * @param {Array} inputsValue - Все введенные ответы на вопросы вида:   question: 'answer'
 * @param {Function} setIsFetching - Происходит ли отправка форма
 * @param {Function} setIsSubmit - Отправлена ли форма
 * @param {Function} setIsReadonly - Только ли для просмотра форма
 * @param {Function} setIsSuccess - Успешный ли запрос (dispatch в context)
 * @param {Function} setShowModal - Отобразить ли модальное окно (dispatch в context)
 *
 * @returns {void} - Сумма двух чисел.
 *
 */

const sendTemplateAsync = async (inputsValue, setIsFetching, setIsSubmit, setIsReadonly, setIsSuccess, setShowModal) => {
  setIsFetching(true)
  setIsSubmit(true)
  setIsReadonly(true)

  // отправляем сообщение в SW о том, что этот запрос не является повторным
  requestsBroadcast.postMessage({
    type: 'REQUEST',
  })

  await checkAPI
    .postTemplate(inputsValue) // отправка данных на сервер
    .then(() => {
      setIsSuccess(true)
    })
    .catch((error) => {
      setIsSuccess(false)

      console.error(error)
    })
    .finally(() => {
      setIsFetching(false)
      setShowModal(true)
    })
}

export default sendTemplateAsync
