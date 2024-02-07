import React, { useState } from 'react'
import { Button, Input, Tooltip, Select } from 'antd'
import { CloseOutlined, DeleteOutlined, DeleteFilled } from '@ant-design/icons'

const { Option } = Select

export const QuestionInputEl = ({ element, setQuestionTitle, setElementRemark, deleteElement, setElementOrder }) => {
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

    setQuestionTitle(element.element.order, { text: element.title.text, remark: e.target.value })
  }

  const handleOrderChange = (value) => {
    setElementOrder(element.element.order, value)
  }

  let title = ''

  switch (element.type) {
    case 'date':
      title = 'Вопрос с выбором даты'
      break

    case 'text':
      title = 'Вопрос с текстовым ответом'
      break

    case 'number':
      title = 'Вопрос с числовым ответом'
      break

    default:
      title = 'Вопрос'
      break
  }

  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      <h5>{title}</h5>
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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
