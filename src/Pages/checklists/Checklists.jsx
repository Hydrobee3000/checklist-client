import React, { useContext, useEffect, useState } from 'react'
import { appContext, setIsSuccess, setShowModal } from '../../store/reducers/appReducer'
import { BlockTitle, BlockTitleComment } from '../../Components/FormsParts/Titles/BlockTitle' // заголовок блока вопросов
import Header from '../../Components/Header/Header'
import SubmitButton from '../../Components/FormsParts/Buttons/SubmitButton' // кнопка отправки формы
import QuestionRenderer from '../../utils/QuestionsRender'
import defaultSetValue from '../../utils/defaultSetValue' // ф-я установки значения по-умолчанию в стейт
import sendFormAsync from '../../utils/sendFormAsync' // ф-я отправки данных формы на сервер

//

const Checklist = ({ data }) => {
  const { dispatch } = useContext(appContext)
  const [inputsValue, setInputsValue] = useState([]) // все введенные в форму данные

  /* отправка формы */
  const [isSubmit, setIsSubmit] = useState(false) // отправлена ли форма (блокирование кнопки отправки)
  const [isFetching, setIsFetching] = useState(false) // происходит ли запрос
  const [isReadonly, setIsReadonly] = useState(false) // включен ли режим чтения (после отправки формы)

  let defaultDateNow = new Date().toISOString().slice(0, 10) // значение даты по-умолчанию

  useEffect(() => {
    defaultSetValue(setInputsValue, data, defaultDateNow) // установка начальной даты
  }, [])

  // отправка формы
  const onSubmit = async (e) => {
    e.preventDefault()

    const dispatchIsSuccess = (value) => dispatch(setIsSuccess(value))
    const dispatchShowModal = (value) => dispatch(setShowModal(value))

    // отправка на сервер + информация для service-worker
    await sendFormAsync(inputsValue, setIsFetching, setIsSubmit, setIsReadonly, dispatchIsSuccess, dispatchShowModal)
  }

  return (
    <>
      <Header>{data.formsName}</Header>
      <div className='app__content'>
        <form onSubmit={onSubmit} className='app__content_form'>
          {data?.elements?.map((element, index) => {
            return (
              <React.Fragment key={index}>
                {element?.element?.type === 'title' && (
                  <>
                    <BlockTitle order={element?.element?.order}>{element?.title?.text}</BlockTitle>
                    {element?.title?.text && <BlockTitleComment>{element?.title?.remark}</BlockTitleComment>}
                  </>
                )}

                {element?.element?.type === 'question' && (
                  <QuestionRenderer
                    questionData={element}
                    setInputsValue={setInputsValue}
                    inputsValue={inputsValue}
                    isReadonly={isReadonly}
                    today={defaultDateNow}
                  />
                )}
              </React.Fragment>
            )
          })}

          <SubmitButton isSubmit={isSubmit} isFetching={isFetching} />
        </form>
      </div>
    </>
  )
}

export default Checklist
