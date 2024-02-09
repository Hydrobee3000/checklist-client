import React from 'react'
import InputQuestion from '../Components/FormsParts/Questions/InputQuestion'
import RadioQuestion from '../Components/FormsParts/Questions/RadioQuestion'
import RadioPlusInputQuestion from '../Components/FormsParts/Questions/RadioPlusInputQuestion'
import WithAdditionalQuestion from '../Components/FormsParts/Questions/WithAdditionalQuestion/WithAdditionalQuestion'

const QuestionRenderer = ({ questionData, setInputsValue, inputsValue, isReadonly, today }) => {
  const { component, type, isRequire, isMultipleAnswers } = questionData

  switch (component) {
    case 'INPUT':
      return (
        <InputQuestion
          dataQuestion={questionData}
          setInputsValue={setInputsValue}
          defaultValue={type === 'date' ? today : undefined}
          isReadonly={isReadonly}
          required={isRequire}
        />
      )
    case 'RADIO':
      return (
        <RadioQuestion
          dataQuestion={questionData}
          setInputsValue={setInputsValue}
          inputsValue={inputsValue}
          isReadonly={isReadonly}
          required={isRequire}
          multiple={isMultipleAnswers}
          inputType={type}
        />
      )
    case 'RADIO_PLUS_INPUT':
      return (
        <RadioPlusInputQuestion
          dataQuestion={questionData}
          setInputsValue={setInputsValue}
          inputsValue={inputsValue}
          isReadonly={isReadonly}
          inputType={type}
          required={isRequire}
        />
      )
    case 'RADIO_WITH_ADDITIONAL_INPUT':
      return (
        <WithAdditionalQuestion
          dataQuestion={questionData}
          setInputsValue={setInputsValue}
          inputsValue={inputsValue}
          isReadonly={isReadonly}
          required={isRequire}
        />
      )

    default:
      return null
  }
}

export default QuestionRenderer
