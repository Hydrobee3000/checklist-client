import React, { useState } from 'react'
import { Button, Input, Tooltip, Select } from 'antd'
import Header from '../../Components/Header/Header'
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons'

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

const CreateForm = () => {
  const [inputsValue, setInputsValue] = useState({ formsName: null, elements: [] })

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

  const setElementTitle = (order, value) => {
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((element) =>
        element.element?.type === 'title' && element.element?.order === order
          ? { ...element, title: { ...element.title, text: value } }
          : element
      ),
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

  const setElementRemark = (order, value) => {
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((element) =>
        element.element?.type === 'title' && element.element?.order === order
          ? { ...element, title: { ...element.title, remark: value } }
          : element
      ),
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
          <Button block>Выбор даты</Button>
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

          {inputsValue.elements.map((element) => (
            <FormBlock
              key={element.element.order}
              element={element}
              setElementTitle={setElementTitle}
              setElementRemark={setElementRemark}
              deleteElement={deleteElement}
              setElementOrder={setElementOrder}
            />
          ))}
        </form>
      </div>
    </>
  )
}

export default CreateForm
