import React, { useState } from 'react'
import { Button, Input, Tooltip, Select, Radio, Switch, Checkbox } from 'antd'
import { CloseOutlined, DeleteOutlined, DeleteFilled, LineOutlined } from '@ant-design/icons'

const { Option } = Select

export const QuestionSelectEl = ({
  inputsValue,
  setInputsValue,
  element,
  setQuestionTitle,
  setElementRemark,
  deleteElement,
  setElementOrder,
  multiple = false,
}) => {
  const [isRemarkInputVisible, setRemarkInputVisible] = useState(false)
  const radioAnswers = element.variants || []

  const handleAddRemarkClick = () => {
    setRemarkInputVisible(true)
  }

  const handleDeleteRemarkClick = () => {
    setElementRemark(element.element.order, null)
    setRemarkInputVisible(false)
  }

  const handleRemarkInputChange = (e) => {
    setElementRemark(element.element.order, e.target.value)
    setQuestionTitle(element.element.order, { text: element.title.text, remark: e.target.value })
  }

  const handleOrderChange = (value) => {
    setElementOrder(element.element.order, value)
  }

  const handleRadioAnswerChange = (index, e) => {
    const updatedRadioAnswers = [...inputsValue.elements[element.element.order - 1].variants]
    updatedRadioAnswers[index].value = e.target.value
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((el, i) => {
        if (i === element.element.order - 1) {
          return {
            ...el,
            variants: updatedRadioAnswers,
          }
        }
        return el
      }),
    }))
  }

  // Добавление нового варианта ответа
  const handleAddRadioAnswer = () => {
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((el, i) => {
        if (i === element.element.order - 1) {
          return {
            ...el,
            variants: [...el.variants, { value: '' }],
          }
        }
        return el
      }),
    }))
  }

  // Удаление варианта ответа
  const handleDeleteRadioAnswer = (answerIndex) => {
    setInputsValue((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((el, i) => {
        if (i === element.element.order - 1) {
          return {
            ...el,
            variants: el.variants.filter((_, index) => index !== answerIndex),
          }
        }
        return el
      }),
    }))
  }

  let title = multiple ? 'Вопрос с множеством ответов из выпадающего списка' : 'Вопрос с одним ответом из выпадающего списка'

  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      {/* <div style={{ marginBottom: '10px' }}> */}
      <h5>{title}</h5>
      {/* <Switch size='small' checkedChildren='1' unCheckedChildren='>1' /> */}
      {/* </div> */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
        <Select style={{ width: 70, marginRight: '5px' }} defaultValue={element.order} onChange={handleOrderChange}>
          <Option value={1}>1.</Option>
          <Option value={2}>2.</Option>
        </Select>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Input
            allowClear
            placeholder='Введите название вопроса'
            value={element.title.text}
            onChange={(e) => setQuestionTitle(element.element.order, { ...element.title, text: e.target.value })}
          />
        </div>
        <Tooltip title='Удалить вопрос'>
          <Button type='text' danger icon={<DeleteFilled />} onClick={() => deleteElement(element.element.order)} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '8px' }}>
        {!isRemarkInputVisible && (
          <Tooltip title='Добавить комментарий'>
            <Button style={{ marginBottom: '8px' }} className='ant-btn' size='small' onClick={handleAddRemarkClick}>
              Добавить комментарий
            </Button>
          </Tooltip>
        )}
        {isRemarkInputVisible && (
          <>
            <Input
              size='small'
              style={{ marginRight: '10px', flex: 1 }}
              placeholder='Введите комментарий'
              onChange={handleRemarkInputChange}
              allowClear
            />
            <Tooltip title='Удалить комментарий'>
              <Button className='ant-btn' type='text' danger icon={<CloseOutlined />} onClick={handleDeleteRemarkClick} />
            </Tooltip>
          </>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {radioAnswers.map((radioAnswer, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
            {/* иконка */}
            {multiple ? <Checkbox disabled style={{ marginLeft: '5px' }} /> : <Radio disabled style={{ marginLeft: '5px' }} />}

            <Input
              style={{ marginRight: '10px', flex: 1, marginLeft: multiple ? '13px' : '5px' }}
              allowClear
              placeholder='Введите вариант ответа'
              value={radioAnswer.value}
              onChange={(e) => handleRadioAnswerChange(index, e)}
            />
            <Tooltip title='Удалить вариант'>
              <Button
                className='ant-btn'
                type='text'
                danger
                icon={<CloseOutlined />}
                onClick={() => handleDeleteRadioAnswer(index)}
              />
            </Tooltip>
          </div>
        ))}
        <Button onClick={handleAddRadioAnswer}>Добавить вариант ответа</Button>
      </div>
    </div>
  )
}