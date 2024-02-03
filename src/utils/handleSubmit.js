import { checkAPI } from '../Api/Api'
import { requestsBroadcast } from './serviceWorkerMessages' // канал для связи с Service Worker

// отправка заполненной формы

const handleSubmit = async (
  inputsValue,
  setIsFetching,
  setIsSubmit,
  setIsReadonly,
  setIsSuccess,
  setShowModal
) => {
  inputsValue['complTime'] = new Date().toISOString() // добавление поля complTime в объект inputsValue

  setIsFetching(true) // начало запроса на сервер
  setIsSubmit(true) // произошло нажатие на кнопку [отправить]  (блокируем кнопку)
  setIsReadonly(true) // устанавливаем для ответов режим чтения

  // отправляем сообщение в SW о том, что этот запрос не является повторным
  requestsBroadcast.postMessage({
    type: 'REQUEST',
  })

  await checkAPI
    .postData(inputsValue) //отправка данных на сервер
    .then(() => {
      setIsSuccess(true) // запрос выполнен успешно
    })
    .catch((error) => {
      setIsSuccess(false) // запрос не выполнен

      console.error(error)
    })
    .finally(() => {
      setIsFetching(false) // конец запроса
      setShowModal(true)
    })
}

export default handleSubmit
