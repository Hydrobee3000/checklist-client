// если у объекта вопроса существует свойство 'placeholder' - используем значение оттуда, иначе - значение по-умолчанию

// для кастомной текстовой надписи внутри поля ввода

export const setPlaceholder = (dataQuestion) => {
  return dataQuestion?.placeholder
    ? dataQuestion?.placeholder // значение из свойства объекта
    : 'Введите значение' // значение по-умолчанию
}
