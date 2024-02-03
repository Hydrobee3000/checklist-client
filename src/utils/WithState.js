import { useContext, useEffect, useState } from 'react'
import { appContext, setIsSuccess, setShowModal } from '../store/reducers/appReducer'
import defaultSetValue from './defaultSetValue' // ф-я установки значения по-умолчанию в стейт
import handleSubmit from './handleSubmit' // ф-я отправки данных формы на сервер

// добавляет переданным компонентам состояние и логику отправки формы

const withState =
  (Component, data) =>
  ({ ...props }) => {
    const { state, dispatch } = useContext(appContext)

    const [inputsValue, setInputsValue] = useState([]) // все введенные в форму данные

    /* отправка формы */
    const [isSubmit, setIsSubmit] = useState(false) // отправлена ли форма (блокирование кнопки отправки)
    const [isFetching, setIsFetching] = useState(false) // происходит ли запрос
    const [isReadonly, setIsReadonly] = useState(false) // включен ли режим чтения

    let today = new Date().toISOString().slice(0, 10) // для дефолтного значения выбора даты

    useEffect(() => {
      defaultSetValue(setInputsValue, data, today) // установка значений по-умолчанию в стейт
    }, [])

    // отправка формы
    const submit = async (e) => {
      e.preventDefault()

      const dispatchIsSuccess = (value) => dispatch(setIsSuccess(value))
      const dispatchShowModal = (value) => dispatch(setShowModal(value))

      await handleSubmit(
        inputsValue,
        setIsFetching,
        setIsSubmit,
        setIsReadonly,
        dispatchIsSuccess,
        dispatchShowModal
      )
    }

    return (
      <Component
        {...props}
        inputsValue={inputsValue}
        setInputsValue={setInputsValue}
        isSubmit={isSubmit}
        submit={submit}
        today={today}
        isFetching={isFetching}
        isReadonly={isReadonly}
      />
    )
  }

export default withState
