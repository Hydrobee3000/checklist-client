import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { BlockTitle } from '../Components/FormsParts/Titles/BlockTitle'
import Header from '../Components/Header/Header'

const FormBlock = ({ block, setBlockTitle, deleteBlock }) => {
  return (
    <div key={block.order} style={{ display: 'flex', marginBottom: '20px' }}>
      <p style={{ marginRight: '10px' }}>{block.order}</p>
      <Input
        allowClear
        placeholder='Введите заголовок блока'
        value={block.title.text}
        onChange={(e) => setBlockTitle(block.order, e.target.value)}
      />
      <Button type='danger' size='small' onClick={() => deleteBlock(block.order)}>
        Удалить
      </Button>
      {/* Здесь вы можете добавить отрисовку вопросов блока */}
    </div>
  )
}

const CreateForm = () => {
  const [inputsValue, setInputsValue] = useState({ formsName: null, blocks: [] }) // все введенные в форму данные

  console.log(inputsValue)

  const saveAnswersToState = (setter, key, value) => {
    // Функция для обновления состояния
    setter((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }))
  }

  const onCreateBlockTitle = () => {
    const newBlock = {
      isExist: true,
      title: {
        text: null,
        remark: null,
      },
      order: inputsValue.blocks.length + 1,
      questionsData: [],
    }

    setInputsValue((prevData) => ({
      ...prevData,
      blocks: [...prevData.blocks, newBlock],
    }))
  }

  const setBlockTitle = (order, value) => {
    setInputsValue((prevData) => ({
      ...prevData,
      blocks: prevData.blocks.map((block) =>
        block.order === order ? { ...block, title: { ...block.title, text: value } } : block
      ),
    }))
  }

  const deleteBlock = (order) => {
    setInputsValue((prevData) => {
      const updatedBlocks = prevData.blocks
        .filter((block) => block.order !== order)
        .map((block, index) => ({ ...block, order: index + 1 }))

      return {
        ...prevData,
        blocks: updatedBlocks,
      }
    })
  }

  return (
    <>
      <Header>Создать чеклист</Header>
      {/*  */}
      <div className='app__content' style={{ display: 'flex', width: 'auto' }}>
        {/*  */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            // backgroundColor: 'yellow',
            border: '1px dashed black',
            borderRadius: '5px',
            padding: '5px',
            marginRight: '15px',
          }}
        >
          <h5>Добавить элемент</h5>
          <Button block onClick={onCreateBlockTitle}>
            Заголовок
          </Button>
          <Button block>Выбор даты</Button>
          {/*  */}
          <h5 style={{ marginTop: '10px' }}>Добавить вопрос</h5>
          <Button block>Один ответ</Button>
          <Button block>Несколько ответов</Button>
          <Button block>Выпадающий список</Button>
          <Button block>Текст</Button>
          <Button block>Число</Button>
        </div>

        <form className='app__content_form' style={{ flex: 1 }}>
          <h5>Название формы</h5>
          <Input
            style={{ marginBottom: '15px' }}
            placeholder='Введите название формы'
            onChange={(e) => {
              saveAnswersToState(setInputsValue, 'formsName', e.target.value)
            }}
            allowClear
          />

          {inputsValue.blocks.map((block) => (
            <FormBlock key={block.order} block={block} setBlockTitle={setBlockTitle} deleteBlock={deleteBlock} />
          ))}
        </form>
        {/*  */}
      </div>
    </>
  )
}

export default CreateForm
