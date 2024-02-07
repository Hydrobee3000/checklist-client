import React, { useState } from 'react'
import { Button, Input, Tooltip } from 'antd'
import { CloseOutlined, DeleteOutlined, DeleteFilled } from '@ant-design/icons'

export const TitleEl = ({ element, setElementTitle, setElementRemark, deleteElement, setElementOrder }) => {
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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
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
        <Tooltip title='Удалить заголовок'>
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
