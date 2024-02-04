import saveAnswersToState from './saveAnswersToState' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName

//устанавливаем значения по-умолчанию в стейт
const defaultSetValue = (setInputsValue, data, today) => {
  let dateStart = new Date().toISOString()

  // для случаев, если пользователь не изменял установленную по дефолту дату
  if (data.formsName === 'YAG2') {
    saveAnswersToState(setInputsValue, 'detectionDate', today)
  }

  saveAnswersToState(setInputsValue, 'date', today) // default date
  saveAnswersToState(setInputsValue, 'formsName', data.formsName) // название формы
  saveAnswersToState(setInputsValue, 'device', window.navigator.userAgent) // данные об устройстве
  saveAnswersToState(setInputsValue, 'startTime', dateStart) //начало заполнения формы
}

export default defaultSetValue
