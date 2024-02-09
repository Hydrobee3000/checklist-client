import { Select, Input, Button, Tooltip } from 'antd'
import { CloseOutlined, DeleteFilled } from '@ant-design/icons'
import { useState } from 'react'

const { Option } = Select

/**
 * Компонент для создания вопроса с текстом самого вопроса и комментария.
 *
 * @param {Object} props.element - Объект данных вопроса.
 * @param {Function} props.setQuestionTitle - Функция для установки заголовка вопроса.
 * @param {Function} props.setElementRemark - Функция для установки комментария заголовка вопроса.
 * @param {Function} props.deleteElement - Функция для удаления элемента.
 * @param {Function} props.setElementOrder - Функция для установки порядка элемента.
 * @returns {JSX.Element} Компонент React.
 */

const QuestionTitleCreation = ({
  element,
  setElementTitle,
  setElementRemark,
  deleteElement,
  setElementOrder,
  type = 'question',
}) => {
  const [isRemarkInputVisible, setRemarkInputVisible] = useState(false) // отображение поля ввода комментария

  // добавление комментария
  const handleAddRemark = () => {
    setRemarkInputVisible(true)
  }

  // изменение комментария
  const handleChangeRemark = (e) => {
    setElementRemark(element.element.order, type, e.target.value)
    setElementTitle(element.element.order, type, { text: element.title.text, remark: e.target.value })
  }

  // удаление комментария
  const handleDeleteRemark = () => {
    setElementRemark(element.element.order, type, null)
    setRemarkInputVisible(false)
  }

  // изменение порядка
  const handleOrderChange = (value) => {
    setElementOrder(element.element.order, value)
  }

  return (
    <>
      {/* Вопрос */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', width: '100%' }}>
        <Select style={{ width: 70, marginRight: '5px' }} defaultValue={element.order} onChange={handleOrderChange}>
          <Option value={1}>1.</Option>
          <Option value={2}>2.</Option>
        </Select>

        <div style={{ flex: 1, marginRight: '10px' }}>
          <Input
            allowClear
            placeholder='Введите название вопроса'
            value={element.title.text}
            onChange={(e) => setElementTitle(element.element.order, type, { ...element.title, text: e.target.value })}
          />
        </div>
        <Tooltip title='Удалить вопрос'>
          <Button type='text' danger icon={<DeleteFilled />} onClick={() => deleteElement(element.element.order)} />
        </Tooltip>
      </div>

      {/* Комментарий */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
        {!isRemarkInputVisible && (
          <Tooltip title='Добавить комментарий'>
            <Button style={{ marginBottom: '8px' }} className='ant-btn' size='small' onClick={handleAddRemark}>
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
              onChange={handleChangeRemark}
              allowClear
            />
            <Tooltip title='Удалить комментарий'>
              <Button className='ant-btn' type='text' danger icon={<CloseOutlined />} onClick={handleDeleteRemark} />
            </Tooltip>
          </>
        )}
      </div>
    </>
  )
}

export default QuestionTitleCreation
