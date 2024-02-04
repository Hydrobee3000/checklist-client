import React from 'react'
import { BlockTitle, BlockTitleComment } from '../../Components/FormsParts/Titles/BlockTitle' // заголовок блока вопросов
import { checklistsData } from './data_checklists' // данные чеклиста
import Header from '../../Components/Header/Header'
import SubmitButton from '../../Components/FormsParts/Buttons/SubmitButton' // кнопка отправки формы
import withState from '../../utils/WithState' // hoc
import QuestionRenderer from '../../utils/QuestionsRender'

// чеклист: ЯГОК УЭСО заколооборочник

const Checklist = ({ inputsValue, setInputsValue, isSubmit, submit, today, isFetching, isReadonly }) => {
  return (
    <>
      <Header>{checklistsData.formsName}</Header>

      <div className='app__content'>
        <form onSubmit={submit} className='app__content_form'>
          {checklistsData?.blocks?.map((block, index) => {
            return (
              <React.Fragment key={index}>
                {/* каждый блок */}
                {block?.isExist && (
                  <>
                    <BlockTitle order={block?.order}>{block?.title?.text}</BlockTitle>
                    {block?.title?.text && <BlockTitleComment>{block?.title?.remark}</BlockTitleComment>}
                  </>
                )}

                {/**/}
                {block?.questionsData.map((question, index) => {
                  // каждый вопрос
                  return (
                    <QuestionRenderer
                      key={index}
                      questionData={question}
                      setInputsValue={setInputsValue}
                      inputsValue={inputsValue}
                      isReadonly={isReadonly}
                      today={today}
                    />
                  )
                })}
              </React.Fragment>
            )
          })}

          <SubmitButton isSubmit={isSubmit} isFetching={isFetching} />
        </form>
      </div>
    </>
  )
}

const ChecklistWithState = withState(Checklist, checklistsData) // добавляет состояние и функции

export default ChecklistWithState
