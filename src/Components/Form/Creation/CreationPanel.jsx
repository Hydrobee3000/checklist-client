import { Button, Typography } from 'antd'
import {
  UnorderedListOutlined,
  CalendarOutlined,
  FontSizeOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  FieldNumberOutlined,
  LineOutlined,
} from '@ant-design/icons'

/**
 * Компонент для создания различных типов блоков.
 *
 * @param {Function} props.onCreateBlockTitle - Функция для создания блока заголовка.
 * @param {Function} props.onCreateBlockInputQuestion - Функция для создания блока вопроса с полем ввода.
 * @param {Function} props.onCreateBlockRadioQuestion - Функция для создания блока вопроса с выбором одного или нескольких ответов.
 * @param {Function} props.onCreateBlockSelectQuestion - Функция для создания блока вопроса с выбором одного или нескольких ответов из выпадающего списка.
 * @returns {JSX.Element} React компонент.
 */

const CreationPanel = ({
  onCreateBlockTitle,
  onCreateBlockInputQuestion,
  onCreateBlockRadioQuestion,
  onCreateBlockSelectQuestion,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '190px',
        border: '1px dashed black',
        borderRadius: '5px',
        padding: '10px',
        marginRight: '25px',
      }}
    >
      <Typography level={2} style={{ marginBottom: '10px', opacity: 0.5, fontStyle: 'italic' }}>
        Добавить элемент
      </Typography>
      <Button
        block
        size='small'
        style={{ height: '30px', paddingRight: '95%' }}
        onClick={onCreateBlockTitle}
        icon={<LineOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
      >
        Заголовок
      </Button>

      <Typography level={2} style={{ marginBottom: '10px', marginTop: '30px', opacity: 0.5, fontStyle: 'italic' }}>
        Добавить вопрос
      </Typography>
      <Button
        block
        size='small'
        style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
        onClick={() => onCreateBlockInputQuestion('date')}
        icon={<CalendarOutlined style={{ paddingRight: '5px', opacity: 0.4 }} />}
      >
        Дата
      </Button>
      <Button
        block
        size='small'
        style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
        onClick={() => onCreateBlockInputQuestion('text')}
        icon={<FontSizeOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
      >
        Текст
      </Button>
      <Button
        block
        size='small'
        style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
        onClick={() => onCreateBlockInputQuestion('number')}
        icon={<FieldNumberOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
      >
        Число
      </Button>
      <Button
        block
        size='small'
        style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
        onClick={() => onCreateBlockRadioQuestion()}
        icon={<CheckCircleOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
      >
        Один ответ
      </Button>
      <Button
        block
        size='small'
        style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
        onClick={() => onCreateBlockRadioQuestion(true)}
        icon={<CheckSquareOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
      >
        Несколько ответов
      </Button>
      <Button
        block
        size='small'
        style={{ height: '30px', marginBottom: '8px', paddingRight: '95%' }}
        onClick={() => onCreateBlockSelectQuestion(false)}
        icon={<UnorderedListOutlined style={{ paddingRight: '5px', opacity: 0.5 }} />}
      >
        Cписок
      </Button>
    </div>
  )
}

export default CreationPanel
