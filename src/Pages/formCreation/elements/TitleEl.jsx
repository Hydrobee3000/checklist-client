import React, { useState } from 'react'
import { LineOutlined } from '@ant-design/icons'
import ElementTitleCreation from '../../../Components/FormsParts/CreationParts/ElementTitleCreation'
import QuestionTitleCreation from '../../../Components/FormsParts/CreationParts/QuestionTitleCreation'

/**
 * Компонент для отображения вопроса с ответом в виде поля ввода (date, text, number).
 *
 * @param {Object} props.element - Объект данных вопроса.
 * @param {Function} props.setElementTitle - Функция для установки заголовка элемента.
 * @param {Function} props.setElementRemark - Функция для установки комментария заголовка элемента.
 * @param {Function} props.deleteElement - Функция для удаления элемента.
 * @param {Function} props.setElementOrder - Функция для установки порядка элемента.
 * @returns {JSX.Element} Компонент React.
 */

export const TitleEl = ({ element, setElementTitle, setElementRemark, deleteElement, setElementOrder }) => {
  const [isRemarkInputVisible, setRemarkInputVisible] = useState(false)

  // добавление комментария
  const handleAddRemark = () => {
    setRemarkInputVisible(true)
  }

  // изменение комментария
  const handleChangeRemark = (e) => {
    setElementRemark(element.element.order, e.target.value)
  }

  // удаление комментария
  const handleDeleteRemark = () => {
    setElementRemark(element.element.order, null)
    setRemarkInputVisible(false)
  }

  const handleOrderChange = (value) => {
    setElementOrder(element.element.order, value)
  }

  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      {/* заголовок элемента */}
      <ElementTitleCreation>
        <LineOutlined style={{ marginRight: '10px', opacity: 0.5 }} />
        Заголовок
      </ElementTitleCreation>

      {/* вопрос */}
      <QuestionTitleCreation
        element={element}
        setQuestionTitle={setElementTitle}
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
