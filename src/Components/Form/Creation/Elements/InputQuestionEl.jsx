import { CalendarOutlined, FontSizeOutlined, FieldNumberOutlined, LineOutlined } from '@ant-design/icons'
import { elTypes } from '../../../../Pages/formCreation/FormCreationPage'
import ElementName from '../Titles/ElementName'
import QuestionTitleWithRemark from '../Titles/QuestionTitleWithRemark'

/**
 * Компонент для отображения вопроса с ответом в виде поля ввода (date, text, number).
 *
 * @param {Object} props.element - Объект данных вопроса.
 * @param {Function} props.setElementTitle - Функция для установки заголовка вопроса.
 * @param {Function} props.setElementRemark - Функция для установки комментария заголовка.
 * @param {Function} props.deleteElement - Функция для удаления элемента.
 * @param {Function} props.setElementOrder - Функция для установки порядка элемента.
 * @returns {JSX.Element} Компонент React.
 */

export const InputQuestionEl = ({ element, setElementTitle, setElementRemark, deleteElement, setElementOrder }) => {
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
      break
  }

  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      {/* заголовок элемента */}
      <ElementName>
        {icon}
        {title}
      </ElementName>

      {/* вопрос */}
      <QuestionTitleWithRemark
        type={elTypes.question}
        element={element}
        setElementTitle={setElementTitle}
        setElementRemark={setElementRemark}
        deleteElement={deleteElement}
        setElementOrder={setElementOrder}
      />
    </div>
  )
}
