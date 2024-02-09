import { LineOutlined } from '@ant-design/icons'
import { elTypes } from '../CreateForm'
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
  return (
    <div key={element.element.order} style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '100%' }}>
      {/* заголовок элемента */}
      <ElementTitleCreation>
        <LineOutlined style={{ marginRight: '10px', opacity: 0.5 }} />
        Заголовок
      </ElementTitleCreation>

      {/* вопрос */}
      <QuestionTitleCreation
        type={elTypes.title}
        element={element}
        setElementTitle={setElementTitle}
        setElementRemark={setElementRemark}
        deleteElement={deleteElement}
        setElementOrder={setElementOrder}
      />
    </div>
  )
}
