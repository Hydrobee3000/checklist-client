import React, { useContext, useState } from 'react'
import { Button, Input, Typography } from 'antd'
import { TitleEl } from '../../Components/Form/Creation/Elements/TitleEl'
import { InputQuestionEl } from '../../Components/Form/Creation/Elements/InputQuestionEl'
import { RadioQuestionEl } from '../../Components/Form/Creation/Elements/RadioQuestionEl'
import { questionsTypes } from '../../constants/data_checklists'
import Header from '../../Components/Header/Header'
import CreationPanel from '../../Components/Form/Creation/CreationPanel'
import SubmitButton from '../../Components/common/Buttons/SubmitButton'
import { appContext, setIsSuccess, setShowModal } from '../../store/reducers/appReducer'
import sendTemplateAsync from '../../utils/sendTemplateAsync'

export const elTypes = {
  title: 'title',
  question: 'question',
}

/**
 * Страница для создания чеклиста.
 *
 * @component
 *
 * @returns {JSX.Element} Компонент React.
 */

const FormCreationPage = () => {
  const { dispatch } = useContext(appContext)

  const [inputsValue, setInputsValue] = useState({ formsName: null, elements: [] })

  const [isSubmit, setIsSubmit] = useState(false) // отправлена ли форма (блокирование кнопки отправки)
  const [isFetching, setIsFetching] = useState(false) // происходит ли запрос
  const [isReadonly, setIsReadonly] = useState(false) // включен ли режим чтения (после отправки формы)

  const saveAnswersToState = (setter, key, value) => {
    setter((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }))
  }

  const onCreateBlockTitle = () => {
    const newBlock = {
      element: { type: 'title', order: inputsValue.elements.length + 1 },
      indexName: 'title',
      title: {
        text: null,
        remark: null,
      },
      order: null,
      isRequire: true,
    }

    setInputsValue((prevData) => ({
      ...prevData,
      elements: [...prevData.elements, newBlock],
    }))
  }

  const deleteElement = (order) => {
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements
        .filter((element) => element.element?.order !== order)
        .map((element, index) => ({
          ...element,
          element: { ...element.element, order: index + 1 },
        })),
    }))
  }

  // добавление элемента в данные формы
  const setElement = (order, type, update) => {
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((element) =>
        element.element?.type === type && element.element?.order === order ? update(element) : element
      ),
    }))
  }

  // добавление заголовка
  const setElementTitle = (order, type, value) => {
    setElement(order, type, (element) => ({
      ...element,
      title: value,
    }))
  }

  // добавление комментария заголовка
  const setElementRemark = (order, type, value) => {
    setElement(order, type, (element) => ({
      ...element,
      title: { ...element.title, remark: value },
    }))
  }

  const setElementOrder = (order, value) => {
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((element) =>
        element.element?.type === 'title' && element.element?.order === order ? { ...element, order: value } : element
      ),
    }))
  }

  // добавление вопроса с полем ввода (date, number, text)
  const onCreateBlockInputQuestion = (type) => {
    const newBlock = {
      element: { type: 'question', order: inputsValue.elements.length + 1 },
      indexName: type,
      order: null,
      title: '',
      type: type,
      component: questionsTypes.INPUT,
      isRequire: true,
    }

    setInputsValue((prevData) => ({
      ...prevData,
      elements: [...prevData.elements, newBlock],
    }))
  }

  // добавление вопроса с выбором варианта ответа: один/множество
  const onCreateBlockRadioQuestion = (isMultiple = false) => {
    const newBlock = {
      element: { type: 'question', order: inputsValue.elements.length + 1 },
      indexName: 'radio',
      order: null,
      title: {
        text: '',
        remark: null,
      },
      type: 'radio',
      component: questionsTypes.RADIO,
      isRequire: true,
      isMultipleAnswers: isMultiple,
      variants: [{ value: '' }, { value: '' }],
    }

    setInputsValue((prevData) => ({
      ...prevData,
      elements: [...prevData.elements, newBlock],
    }))
  }

  // добавление вопроса с выбором варианта ответа из списка: один/множество
  const onCreateBlockSelectQuestion = (isMultiple = false) => {
    const newBlock = {
      element: { type: 'question', order: inputsValue.elements.length + 1 },
      indexName: 'select Question',
      order: null,
      title: {
        text: '',
        remark: null,
      },
      type: 'select',
      component: isMultiple ? questionsTypes.SELECT_MULTIPLE : questionsTypes.SELECT,
      isRequire: true,
      isMultipleAnswers: isMultiple,
      variants: [{ value: '' }, { value: '' }],
    }

    setInputsValue((prevData) => ({
      ...prevData,
      elements: [...prevData.elements, newBlock],
    }))
  }

  // отправка формы
  const onSubmit = async (e) => {
    e.preventDefault()

    const dispatchIsSuccess = (value) => dispatch(setIsSuccess(value))
    const dispatchShowModal = (value) => dispatch(setShowModal(value))

    // отправка на сервер + информация для service-worker
    await sendTemplateAsync(inputsValue, setIsFetching, setIsSubmit, setIsReadonly, dispatchIsSuccess, dispatchShowModal)
  }

  return (
    <>
      <Header>Создание опроса</Header>
      <div className='app__content' style={{ display: 'flex', width: 'auto' }}>
        <CreationPanel
          onCreateBlockTitle={onCreateBlockTitle}
          onCreateBlockInputQuestion={onCreateBlockInputQuestion}
          onCreateBlockRadioQuestion={onCreateBlockRadioQuestion}
          onCreateBlockSelectQuestion={onCreateBlockSelectQuestion}
        />

        <form onSubmit={onSubmit} className='app__content_form' style={{ flex: 1 }}>
          <div style={{ marginRight: '10px', marginBottom: '40px' }}>
            <Typography level={2} style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Название формы
            </Typography>
            <Input
              size='large'
              placeholder='Введите название формы'
              onChange={(e) => {
                saveAnswersToState(setInputsValue, 'formsName', e.target.value)
              }}
              allowClear
            />
          </div>

          {inputsValue.elements.map((question) =>
            question.element.type === 'title' ? (
              <TitleEl
                key={question.element.order}
                element={question}
                setElementTitle={setElementTitle}
                setElementRemark={setElementRemark}
                deleteElement={deleteElement}
                setElementOrder={setElementOrder}
              />
            ) : question.element.type === 'question' && question.component === questionsTypes.INPUT ? (
              <InputQuestionEl
                key={question.element.order}
                element={question}
                setElementTitle={setElementTitle}
                setElementRemark={setElementRemark}
                deleteElement={deleteElement}
                setElementOrder={setElementOrder}
              />
            ) : question.element.type === 'question' &&
              (question.component === questionsTypes.RADIO || question.component === questionsTypes.SELECT) ? (
              <RadioQuestionEl
                key={question.element.order}
                inputsValue={inputsValue}
                setInputsValue={setInputsValue}
                element={question}
                setElementTitle={setElementTitle}
                setElementRemark={setElementRemark}
                deleteElement={deleteElement}
                setElementOrder={setElementOrder}
                multiple={question.isMultipleAnswers}
              />
            ) : null
          )}

          <SubmitButton isSubmit={isSubmit} isFetching={isFetching} isCreation />
        </form>
      </div>
    </>
  )
}

export default FormCreationPage
