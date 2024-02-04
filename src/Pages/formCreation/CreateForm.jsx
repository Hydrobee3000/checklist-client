import React, { useState } from 'react'
import { Button, Input, Tooltip, Select } from 'antd'
import Header from '../../Components/Header/Header'
import { CloseOutlined } from '@ant-design/icons'
import { questionsTypes } from '../checklists/data_checklists'

const { Option } = Select

const FormBlock = ({ element, setElementTitle, setElementRemark, deleteElement, setElementOrder }) => {
  const [isRemarkInputVisible, setRemarkInputVisible] = useState(false)

  const handleAddRemarkClick = () => {
    setRemarkInputVisible(true)
  }

  const handleDeleteRemarkClick = () => {
    setElementRemark(element.element.order, null)
    setRemarkInputVisible(false)
  }

  const handleRemarkInputChange = (e) => {
    setElementRemark(element.element.order, e.target.value)
  }

  const handleOrderChange = (value) => {
    setElementOrder(element.element.order, value)
  }

  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      <h5>Заголовок</h5>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '100%' }}>
        {/* <Select style={{ width: 70, marginRight: '5px' }} defaultValue={element.order} onChange={handleOrderChange}>
          <Option value={1}>1.</Option>
          <Option value={2}>2.</Option>
        </Select> */}
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Input
            allowClear
            placeholder='Введите заголовок'
            value={element.title.text}
            onChange={(e) => setElementTitle(element.element.order, e.target.value)}
          />
        </div>
        <Tooltip title='Удалить'>
          <Button type='text' danger icon={<CloseOutlined />} onClick={() => deleteElement(element.element.order)} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {!isRemarkInputVisible && (
          <Tooltip title='Добавить комментарий'>
            <Button className='ant-btn' size='small' onClick={handleAddRemarkClick}>
              Добавить комментарий
            </Button>
          </Tooltip>
        )}
        {isRemarkInputVisible && (
          <>
            <Input
              allowClear
              placeholder='Введите комментарий'
              onChange={handleRemarkInputChange}
              style={{ marginRight: '10px', width: '100%' }}
            />
            <Tooltip title='Удалить комментарий'>
              <Button className='ant-btn' type='text' danger icon={<CloseOutlined />} onClick={handleDeleteRemarkClick} />
            </Tooltip>
          </>
        )}
      </div>
    </div>
  )
}

//

const QuestionDateBlock = ({ element, setElementTitle, setElementRemark, deleteElement, setElementOrder }) => {
  const [isRemarkInputVisible, setRemarkInputVisible] = useState(false)

  const handleAddRemarkClick = () => {
    setRemarkInputVisible(true)
  }

  const handleDeleteRemarkClick = () => {
    setElementRemark(element.element.order, null)
    setRemarkInputVisible(false)
  }

  const handleRemarkInputChange = (e) => {
    setElementRemark(element.element.order, e.target.value)

    setElementTitle(element.element.order, { text: element.title.text, remark: e.target.value })
  }

  const handleOrderChange = (value) => {
    setElementOrder(element.element.order, value)
  }

  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      <h5>Вопрос с выбором даты</h5>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '100%' }}>
        <Select style={{ width: 70, marginRight: '5px' }} defaultValue={element.order} onChange={handleOrderChange}>
          <Option value={1}>1.</Option>
          <Option value={2}>2.</Option>
        </Select>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Input
            allowClear
            placeholder='Введите название вопроса'
            value={element.title.text}
            onChange={(e) => setElementTitle(element.element.order, { ...element.title, text: e.target.value })}
          />
        </div>
        <Tooltip title='Удалить'>
          <Button type='text' danger icon={<CloseOutlined />} onClick={() => deleteElement(element.element.order)} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {!isRemarkInputVisible && (
          <Tooltip title='Добавить комментарий'>
            <Button className='ant-btn' size='small' onClick={handleAddRemarkClick}>
              Добавить комментарий
            </Button>
          </Tooltip>
        )}
        {isRemarkInputVisible && (
          <>
            <Input
              allowClear
              placeholder='Введите комментарий'
              onChange={handleRemarkInputChange}
              style={{ marginRight: '10px', flex: 1 }}
            />
            <Tooltip title='Удалить комментарий'>
              <Button className='ant-btn' type='text' danger icon={<CloseOutlined />} onClick={handleDeleteRemarkClick} />
            </Tooltip>
          </>
        )}
      </div>
    </div>
  )
}

//
//
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

  const setElementTitle = (order, value) => {
    setElement(order, 'title', (element) => ({
      ...element,
      title: { ...element.title, text: value },
    }))
  }

  const setElementRemark = (order, value) => {
    setElement(order, 'title', (element) => ({
      ...element,
      title: { ...element.title, remark: value },
    }))
  }

  const setQuestionTitle = (order, value) => {
    setElement(order, 'question', (element) => ({
      ...element,
      title: value,
    }))
  }

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

  const onCreateBlockQuestionDate = () => {
    const newBlock = {
      element: { type: 'question', order: inputsValue.elements.length + 1 },
      indexName: 'date',
      order: null,
      title: 'Введите дату проверки',
      titleRemark: null,
      type: 'date',
      component: questionsTypes.INPUT,
      isRequire: true,
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
          <h5>Добавить элемент</h5>
          <Button block onClick={onCreateBlockTitle}>
            Заголовок
          </Button>
          <Button block onClick={onCreateBlockQuestionDate}>
            Выбор даты
          </Button>
          <h5 style={{ marginTop: '10px' }}>Добавить вопрос</h5>
          <Button block>Один ответ</Button>
          <Button block>Несколько ответов</Button>
          <Button block>Выпадающий список</Button>
          <Button block>Текст</Button>
          <Button block>Число</Button>
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

          {inputsValue.elements.map((element) =>
            // Проверяем тип элемента и рендерим соответствующий блок
            element.element.type === 'title' ? (
              <FormBlock
                key={element.element.order}
                element={element}
                setElementTitle={setElementTitle}
                setElementRemark={setElementRemark}
                deleteElement={deleteElement}
                setElementOrder={setElementOrder}
              />
            ) : element.element.type === 'question' ? (
              <QuestionDateBlock
                key={element.element.order}
                element={element}
                setElementTitle={setQuestionTitle}
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
