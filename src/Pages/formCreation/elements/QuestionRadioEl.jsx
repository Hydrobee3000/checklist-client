import React, { useState, useEffect } from 'react'
import { Button, Input, Tooltip, Radio, Switch, Checkbox, Typography } from 'antd'
import { CloseOutlined, CheckSquareOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { elTypes } from '../CreateForm'
import ElementTitleCreation from '../../../Components/FormsParts/CreationParts/ElementTitleCreation'
import QuestionTitleCreation from '../../../Components/FormsParts/CreationParts/QuestionTitleCreation'

/**
 * Компонент для отображения вопроса с выбором одного или нескольких ответов.
 *
 * @param {Object} props.inputsValue - Значение ввода.
 * @param {Function} props.setInputsValue - Функция для установки значения ввода.
 * @param {Object} props.element - Элемент вопроса.
 * @param {Function} props.setElementTitle - Функция для установки заголовка вопроса.
 * @param {Function} props.setElementRemark - Функция для установки примечания элемента.
 * @param {Function} props.deleteElement - Функция для удаления элемента.
 * @param {Function} props.setElementOrder - Функция для установки порядка элемента.
 * @param {boolean} [props.multiple=false] - Флаг, указывающий, поддерживает ли вопрос множественные ответы.
 * @returns {JSX.Element} Компонент React.
 */

export const QuestionRadioEl = ({
  inputsValue,
  setInputsValue,
  element,
  setElementTitle,
  setElementRemark,
  deleteElement,
  setElementOrder,
  multiple = false,
}) => {
  const [isMultipleAnswers, setIsMultipleAnswers] = useState(multiple) // Добавлено состояние для хранения значения переключателя

  const radioAnswers = element.variants || []

  let title = '' // текст вопроса
  let icon = null // иконка вопроса

  switch (isMultipleAnswers) {
    case true:
      title = 'Вопрос с множеством вариантов ответа'
      icon = <CheckSquareOutlined style={{ marginRight: '10px', marginBottom: '10px', opacity: 0.5 }} />
      break

    case false:
      title = 'Вопрос с одним вариантом ответа'
      icon = <CheckCircleOutlined style={{ marginRight: '10px', marginBottom: '10px', opacity: 0.5 }} />
      break

    default:
      title = 'Вопрос с выбором варианта ответа'
      break
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

  useEffect(() => {
    const updateIsMultipleAnswers = () => {
      setInputsValue((prevData) => ({
        ...prevData,
        elements: prevData.elements.map((el, i) => {
          if (i === element.element.order - 1) {
            return {
              ...el,
              isMultipleAnswers: isMultipleAnswers,
            }
          }
          return el
        }),
      }))
    }

    updateIsMultipleAnswers()
  }, [isMultipleAnswers, setInputsValue, element.element.order])

  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      {/* заголовок элемента */}
      <ElementTitleCreation>
        {icon}
        {title}
        <div style={{ marginBottom: '10px' }}>
          <Typography style={{ opacity: 0.3 }}>ответов</Typography>
          <Switch
            checked={isMultipleAnswers} // Привязываем переключатель к состоянию isMultipleAnswers
            onChange={(checked) => setIsMultipleAnswers(checked)} // Обновляем состояние isMultipleAnswers при изменении переключателя
            checkedChildren='1'
            unCheckedChildren='>1'
          />
        </div>
      </ElementTitleCreation>

      {/* вопрос */}
      <QuestionTitleCreation
        type={elTypes.question}
        element={element}
        setElementTitle={setElementTitle}
        setElementRemark={setElementRemark}
        deleteElement={deleteElement}
        setElementOrder={setElementOrder}
      />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {radioAnswers.map((radioAnswer, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
            {isMultipleAnswers ? (
              <Checkbox disabled style={{ marginLeft: '5px' }} />
            ) : (
              <Radio disabled style={{ marginLeft: '5px' }} />
            )}
            <Input
              style={{ marginRight: '10px', flex: 1, marginLeft: isMultipleAnswers ? '13px' : '5px' }}
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
