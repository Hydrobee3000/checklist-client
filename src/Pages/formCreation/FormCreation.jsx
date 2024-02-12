import React, { useState } from 'react'
import { Button, Input, Typography } from 'antd'
import Header from '../../Components/Header/Header'
import {
  UnorderedListOutlined,
  CalendarOutlined,
  FontSizeOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  FieldNumberOutlined,
  LineOutlined,
} from '@ant-design/icons'
import { questionsTypes } from '../formRenderer/data_checklists'
import { TitleEl } from './elements/TitleEl'
import { QuestionInputEl } from './elements/QuestionInputEl'
import { QuestionRadioEl } from './elements/QuestionRadioEl'

export const elTypes = {
  title: 'title',
  question: 'question',
}

//

const CreateForm = () => {
  const [inputsValue, setInputsValue] = useState({ formsName: null, elements: [] })
  console.dir(inputsValue)

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

  return (
    <>
      <Header>Создание опроса</Header>
      <div className='app__content' style={{ display: 'flex', width: 'auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '190px',
            border: '1px dashed black',
            borderRadius: '5px',
            padding: '10px',
            marginRight: '25px',
          }}
        >
          <Typography level={2} style={{ marginBottom: '10px', opacity: 0.5, fontStyle: 'italic' }}>
            Добавить элемент
          </Typography>
          <Button
            block
            size='small'
            style={{ height: '30px', paddingRight: '95%' }}
            onClick={onCreateBlockTitle}
            icon={<LineOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
          >
            Заголовок
          </Button>

          <Typography level={2} style={{ marginBottom: '10px', marginTop: '30px', opacity: 0.5, fontStyle: 'italic' }}>
            Добавить вопрос
          </Typography>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
            onClick={() => onCreateBlockInputQuestion('date')}
            icon={<CalendarOutlined style={{ paddingRight: '5px', opacity: 0.4 }} />}
          >
            Дата
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
            onClick={() => onCreateBlockInputQuestion('text')}
            icon={<FontSizeOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
          >
            Текст
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
            onClick={() => onCreateBlockInputQuestion('number')}
            icon={<FieldNumberOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
          >
            Число
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
            onClick={() => onCreateBlockRadioQuestion()}
            icon={<CheckCircleOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
          >
            Один ответ
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
            onClick={() => onCreateBlockRadioQuestion(true)}
            icon={<CheckSquareOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
          >
            Несколько ответов
          </Button>
          <Button
            block
            size='small'
            style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
            onClick={() => onCreateBlockSelectQuestion(false)}
            icon={<UnorderedListOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
          >
            Cписок
          </Button>
        </div>

        <form className='app__content_form' style={{ flex: 1 }}>
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
              <QuestionInputEl
                key={question.element.order}
                element={question}
                setElementTitle={setElementTitle}
                setElementRemark={setElementRemark}
                deleteElement={deleteElement}
                setElementOrder={setElementOrder}
              />
            ) : question.element.type === 'question' &&
              (question.component === questionsTypes.RADIO || question.component === questionsTypes.SELECT) ? (
              <QuestionRadioEl
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
        </form>
      </div>
    </>
  )
}

export default CreateForm
