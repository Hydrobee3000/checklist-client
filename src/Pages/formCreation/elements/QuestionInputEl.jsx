import React, { useState } from 'react'
import { CalendarOutlined, FontSizeOutlined, FieldNumberOutlined, LineOutlined } from '@ant-design/icons'
import TitleCreation from '../../../Components/FormsParts/FormCreation/TitleCreation'
import QuestionCreation from '../../../Components/FormsParts/FormCreation/QuestionCreation'

/**
 * Компонент для отображения вопроса с ответом в виде поля ввода (date, text, number).
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.element - Объект данных вопроса.
 * @param {Function} props.setQuestionTitle - Функция для установки заголовка вопроса.
 * @param {Function} props.setElementRemark - Функция для установки комментария заголовка.
 * @param {Function} props.deleteElement - Функция для удаления элемента.
 * @param {Function} props.setElementOrder - Функция для установки порядка элемента.
 * @returns {JSX.Element} Компонент React.
 */

export const QuestionInputEl = ({ element, setQuestionTitle, setElementRemark, deleteElement, setElementOrder }) => {
  const [isRemarkInputVisible, setRemarkInputVisible] = useState(false) // отображение поля ввода комментария

  // добавление комментария
  const handleAddRemark = () => {
    setRemarkInputVisible(true)
  }

  // изменение комментария
  const handleChangeRemark = (e) => {
    setElementRemark(element.element.order, e.target.value)
    setQuestionTitle(element.element.order, { text: element.title.text, remark: e.target.value })
  }

  // удаление комментария
  const handleDeleteRemark = () => {
    setElementRemark(element.element.order, null)
    setRemarkInputVisible(false)
  }

  const handleOrderChange = (value) => {
    setElementOrder(element.element.order, value)
  }

  let title = '' // текст вопроса
  let icon = null // иконка вопроса

  switch (element.type) {
    case 'date':
      title = 'Вопрос с выбором даты'
      icon = <CalendarOutlined style={{ marginRight: '10px', marginBottom: '10px', opacity: 0.5 }} />
      break

    case 'text':
      title = 'Вопрос с текстовым ответом'
      icon = <FontSizeOutlined style={{ marginRight: '10px', marginBottom: '10px', opacity: 0.5 }} />
      break

    case 'number':
      title = 'Вопрос с числовым ответом'
      icon = <FieldNumberOutlined style={{ marginRight: '10px', marginBottom: '10px', opacity: 0.5 }} />
      break

    default:
      title = 'Вопрос с полем ввода'
      icon = <LineOutlined style={{ marginRight: '10px', marginBottom: '10px', opacity: 0.5 }} />
      break
  }

  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      {/* заголовок элемента */}
      <TitleCreation>
        {icon}
        {title}
      </TitleCreation>

      {/* вопрос */}
      <QuestionCreation
        element={element}
        setQuestionTitle={setQuestionTitle}
        deleteElement={deleteElement}
        isRemarkInputVisible={isRemarkInputVisible}
        handleAddRemark={handleAddRemark}
        handleChangeRemark={handleChangeRemark}
        handleDeleteRemark={handleDeleteRemark}
        handleOrderChange={handleOrderChange}
      />
    </div>
  )
}
