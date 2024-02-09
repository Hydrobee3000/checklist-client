import { Select, Input, Button, Tooltip } from 'antd'
import { CloseOutlined, DeleteFilled } from '@ant-design/icons'

const { Option } = Select

/**
 * Компонент для создания вопроса с текстом самого вопроса и комментария.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.element - Объект данных вопроса.
 * @param {Function} props.setQuestionTitle - Функция для установки заголовка вопроса.
 * @param {Function} props.deleteElement - Функция для удаления элемента.
 * @param {boolean} props.isRemarkInputVisible - Флаг видимости поля ввода комментария.
 * @param {Function} props.handleAddRemark - Функция для добавления комментария.
 * @param {Function} props.handleChangeRemark - Функция для изменения комментария.
 * @param {Function} props.handleDeleteRemark - Функция для удаления комментария.
 * @param {Function} props.handleOrderChange - Функция для изменения порядка вопроса.
 * @returns {JSX.Element} Компонент React.
 */

const QuestionTitleCreation = ({
  element,
  setQuestionTitle,
  deleteElement,
  isRemarkInputVisible,
  handleAddRemark,
  handleChangeRemark,
  handleDeleteRemark,
  handleOrderChange,
}) => {
  return (
    <>
      {/* Вопрос */}
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

      {/* Комментарий */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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
