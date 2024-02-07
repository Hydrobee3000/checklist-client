import React, { useState } from 'react'
import { Button, Input, Tooltip, Select } from 'antd'
import Header from '../../Components/Header/Header'
import { CloseOutlined } from '@ant-design/icons'
import { questionsTypes } from '../checklists/data_checklists'
import { TitleEl } from './elements/TitleEl'
import { QuestionInputEl } from './elements/QuestionInputEl'
import { QuestionRadioEl } from './elements/QuestionRadioEl'

//

const CreateForm = () => {
  const [inputsValue, setInputsValue] = useState({ formsName: null, elements: [] })
  console.log(inputsValue)

  const saveAnswersToState = (setter, key, value) => {
    setter((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }))
  }

  const onCreateBlockTitle = () => {
    const newBlock = {
      element: { type: 'title', order: inputsValue.elements.length + 1 },
      isExist: true,
      title: {
        text: null,
        remark: null,
      },
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

  const setElement = (order, type, update) => {
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((element) =>
        element.element?.type === type && element.element?.order === order ? update(element) : element
      ),
    }))
  }

  // заголовок
  const setElementTitle = (order, value) => {
    setElement(order, 'title', (element) => ({
      ...element,
      title: { ...element.title, text: value },
    }))
  }

  // комментарий заголовка
  const setElementRemark = (order, value) => {
    setElement(order, 'title', (element) => ({
      ...element,
      title: { ...element.title, remark: value },
    }))
  }

  // заголовок вопроса
  const setQuestionTitle = (order, value) => {
    setElement(order, 'question', (element) => ({
      ...element,
      title: value,
    }))
  }

  // комментарий заголовка вопроса
  const setQuestionRemark = (order, value) => {
    setElement(order, 'question', (element) => ({
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

  // добавление вопроса с типом input (date, number, text)
  const onCreateBlockInputQuestion = (type) => {
    const newBlock = {
      element: { type: 'question', order: inputsValue.elements.length + 1 },
      indexName: type,
      order: null,
      title: '',
      titleRemark: null,
      type: type,
      component: questionsTypes.INPUT,
      isRequire: true,
    }

    setInputsValue((prevData) => ({
      ...prevData,
      elements: [...prevData.elements, newBlock],
    }))
  }

  // добавление вопроса с выбором одного варианта ответа
  const onCreateBlockSingleChoice = () => {
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
      radio: [{ value: '' }, { value: '' }], // Замените значениями вашего вопроса
    }

    setInputsValue((prevData) => ({
      ...prevData,
      elements: [...prevData.elements, newBlock],
    }))
  }

  return (
    <>
      <Header>Создание опроса</Header>
      <div className='app__content' style={{ display: 'flex', width: 'auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            border: '1px dashed black',
            borderRadius: '5px',
            padding: '5px',
            marginRight: '15px',
          }}
        >
          <h5 style={{ marginTop: '10px' }}>Добавить элемент</h5>
          <Button block onClick={onCreateBlockTitle}>
            Заголовок
          </Button>

          <h5 style={{ marginTop: '15px' }}>Добавить вопрос</h5>
          <Button block onClick={() => onCreateBlockInputQuestion('date')}>
            Дата
          </Button>
          <Button block onClick={() => onCreateBlockInputQuestion('text')}>
            Текст
          </Button>
          <Button block onClick={() => onCreateBlockInputQuestion('number')}>
            Число
          </Button>
          <Button block onClick={() => onCreateBlockSingleChoice('radio')}>
            Один ответ
          </Button>
          <Button block>Несколько ответов</Button>
          <Button block>Выпадающий список</Button>
        </div>

        <form className='app__content_form' style={{ flex: 1 }}>
          <h5>Название формы</h5>
          <Input
            style={{ marginBottom: '40px' }}
            placeholder='Введите название формы'
            onChange={(e) => {
              saveAnswersToState(setInputsValue, 'formsName', e.target.value)
            }}
            allowClear
          />

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
              <QuestionInputEl
                key={question.element.order}
                element={question}
                setQuestionTitle={setQuestionTitle}
                setElementRemark={setQuestionRemark}
                deleteElement={deleteElement}
                setElementOrder={setElementOrder}
              />
            ) : question.element.type === 'question' && question.component === questionsTypes.RADIO ? (
              <QuestionRadioEl
                key={question.element.order}
                inputsValue={inputsValue}
                setInputsValue={setInputsValue}
                element={question}
                setQuestionTitle={setQuestionTitle}
                setElementRemark={setQuestionRemark}
                deleteElement={deleteElement}
                setElementOrder={setElementOrder}
              />
            ) : null
          )}
        </form>
      </div>
    </>
  )
}

export default CreateForm
