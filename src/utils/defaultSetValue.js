import handleChangeInput from './handleChangeInput' // функция, записывает в стейт(inputsValue) ответы на вопросы с их indexName

//устанавливаем значения по-умолчанию в стейт
const defaultSetValue = (setInputsValue, data, today) => {
  let dateStart = new Date().toISOString()

  // для случаев, если пользователь не изменял установленную по дефолту дату
  if (data.formsName === 'YAG2') {
    handleChangeInput(setInputsValue, 'detectionDate', today)
  }

  handleChangeInput(setInputsValue, 'date', today) // default date
  handleChangeInput(setInputsValue, 'formsName', data.formsName) // название формы
  handleChangeInput(setInputsValue, 'device', window.navigator.userAgent) // данные об устройстве
  handleChangeInput(setInputsValue, 'startTime', dateStart) //начало заполнения формы
}

export default defaultSetValue
