import React, { useState } from 'react'
import { Button, Input, Tooltip, Select } from 'antd'
import Header from '../../Components/Header/Header'
import { CloseOutlined } from '@ant-design/icons'
import { questionsTypes } from '../checklists/data_checklists'
import { TitleEl } from './elements/TitleEl'
import { QuestionInputEl } from './elements/QuestionInputEl'
import { QuestionRadioEl } from './elements/QuestionRadioEl'
import { QuestionSelectEl } from './elements/QuestionSelectEl'

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
      component: isMultiple ? questionsTypes.SELECT_MULTIPLE : questionsTypes.SELECT_SINGLE,
      isRequire: true,
      isMultipleAnswers: isMultiple,
      variants: [{ value: '' }, { value: '' }],
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
            width: '170px',
            border: '1px dashed black',
            borderRadius: '5px',
            padding: '5px',
            marginRight: '15px',
          }}
        >
          <h5 style={{ marginTop: '10px' }}>Добавить элемент</h5>
          <Button block style={{ height: '30px' }} onClick={onCreateBlockTitle}>
            Заголовок
          </Button>

          <h5 style={{ marginTop: '15px' }}>Добавить вопрос</h5>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px' }}
            onClick={() => onCreateBlockInputQuestion('date')}
          >
            Дата
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px' }}
            onClick={() => onCreateBlockInputQuestion('text')}
          >
            Текст
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px' }}
            onClick={() => onCreateBlockInputQuestion('number')}
          >
            Число
          </Button>
          <Button block size='small' style={{ height: '30px', marginBottom: '8px' }} onClick={() => onCreateBlockRadioQuestion()}>
            Один ответ
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px' }}
            onClick={() => onCreateBlockRadioQuestion(true)}
          >
            Несколько ответов
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px' }}
            onClick={() => onCreateBlockSelectQuestion(false)}
          >
            Выпадающий список
          </Button>
        </div>

        <form className='app__content_form' style={{ flex: 1 }}>
          <h5>Название формы</h5>
          <Input
            size='large'
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
                multiple={question.isMultipleAnswers}
              />
            ) : question.element.type === 'question' && question.component === questionsTypes.SELECT_SINGLE ? (
              <QuestionSelectEl
                key={question.element.order}
                inputsValue={inputsValue}
                setInputsValue={setInputsValue}
                element={question}
                setQuestionTitle={setQuestionTitle}
                setElementRemark={setQuestionRemark}
                deleteElement={deleteElement}
                setElementOrder={setElementOrder}
                multiple={question.isMultipleAnswers}
              />
            ) : null
          )}
        </form>
      </div>
    </>
  )
}

export default CreateForm
