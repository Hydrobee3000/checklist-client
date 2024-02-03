import { allAdditionalIndexes } from '../constants/additionalIndexes' // массив всех индексов доп. ответов

// выбран ли хоть один дополнительный ответ

export const hasAtLeastOneChosenAdditionalAnswer = (inputsValue, indexName) => {
  // если ответа на доп. вопрос нет - вернём false, иначе - true

  return allAdditionalIndexes.some((dopIndex) => {
    let additionalAnswerIndex = inputsValue?.[`${indexName}${dopIndex}`] // получим значение ответа на доп. вопрос

    // прекратим искать при первом непустом ответе
    return (
      additionalAnswerIndex !== null &&
      additionalAnswerIndex !== undefined &&
      additionalAnswerIndex !== ''
    )
  })
}
