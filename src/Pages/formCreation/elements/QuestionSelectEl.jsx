import { Button, Input, Tooltip, Select, Radio, Checkbox } from 'antd'
import { CloseOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { elTypes } from '../CreateForm'
import ElementTitleCreation from '../../../Components/FormsParts/CreationParts/ElementTitleCreation'
import QuestionTitleCreation from '../../../Components/FormsParts/CreationParts/QuestionTitleCreation'

/**
 * Компонент для отображения вопроса с выбором одного или нескольких ответов из выпадающего списка.
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

export const QuestionSelectEl = ({
  inputsValue,
  setInputsValue,
  element,
  setElementTitle,
  setElementRemark,
  deleteElement,
  setElementOrder,
  multiple = false,
}) => {
  const radioAnswers = element.variants || []

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
      {/* заголовок элемента */}
      <ElementTitleCreation>
        <UnorderedListOutlined style={{ marginRight: '10px', marginBottom: '10px', opacity: 0.5 }} />
        {title}
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
