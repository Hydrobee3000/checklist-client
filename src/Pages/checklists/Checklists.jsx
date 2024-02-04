import React, { useContext, useEffect, useState } from 'react'
import { BlockTitle, BlockTitleComment } from '../../Components/FormsParts/Titles/BlockTitle' // заголовок блока вопросов
// import { data } from './data_checklists' // данные чеклиста
import Header from '../../Components/Header/Header'
import SubmitButton from '../../Components/FormsParts/Buttons/SubmitButton' // кнопка отправки формы
import QuestionRenderer from '../../utils/QuestionsRender'
import { appContext, setIsSuccess, setShowModal } from '../../store/reducers/appReducer'
import defaultSetValue from '../../utils/defaultSetValue' // ф-я установки значения по-умолчанию в стейт
import handleSubmit from '../../utils/handleSubmit' // ф-я отправки данных формы на сервер

//

const Checklist = ({ data }) => {
  const { dispatch } = useContext(appContext)

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

    await handleSubmit(inputsValue, setIsFetching, setIsSubmit, setIsReadonly, dispatchIsSuccess, dispatchShowModal)
  }
  return (
    <>
      <Header>{data.formsName}</Header>
      {/* {data[0].blocks[0].title.text} */}
      <div className='app__content'>
        <form onSubmit={submit} className='app__content_form'>
          {data?.blocks?.map((block, index) => {
            return (
              <React.Fragment key={index}>
                {/* каждый блок */}
                {block?.isExist && (
                  <>
                    <BlockTitle order={block?.order}>{block?.title?.text}</BlockTitle>
                    {block?.title?.text && <BlockTitleComment>{block?.title?.remark}</BlockTitleComment>}
                  </>
                )}

                {/**/}
                {block?.questionsData.map((question, index) => {
                  // каждый вопрос
                  return (
                    <QuestionRenderer
                      key={index}
                      questionData={question}
                      setInputsValue={setInputsValue}
                      inputsValue={inputsValue}
                      isReadonly={isReadonly}
                      today={today}
                    />
                  )
                })}
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
