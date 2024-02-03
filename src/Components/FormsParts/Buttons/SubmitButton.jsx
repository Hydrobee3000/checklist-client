/* компонент кнопки формы */

const SubmitButton = ({ isSubmit, isFetching }) => {
  // если форма не отправлена или в процессе отправления

  if (!isSubmit || (isSubmit && isFetching)) {
    return <SendButton isSubmit={isSubmit} isFetching={isFetching} />
  }
  // если форма отправлена и браузер поддерживает background sync
  else if (isSubmit && isFetching === false && 'serviceWorker' in navigator) {
    return <RefreshButton isFetching={isFetching} />
  }
  // если форма отправлена и браузер НЕ поддерживает background sync
  else if (isSubmit && isFetching === false && !'serviceWorker' in navigator) {
    return (
      <>
        <SendButton isSubmit={isSubmit} isFetching={isFetching} />
        <RefreshButton isFetching={isFetching} />
      </>
    )
  }
}

/* Кнопка отправления данных на сервер */

const SendButton = ({ isSubmit, isFetching }) => {
  return (
    <button type='submit' disabled={isSubmit} className='app__content_btn'>
      {isFetching === true ? 'Подождите..' : 'Отправить'}
    </button>
  )
}

/* Кнопка обновления страницы после отправки данных на сервер */

const RefreshButton = ({ isFetching, content = 'Заполнить новый чек-лист' }) => {
  // функция обновления страницы
  function refreshPage() {
    window.location.reload() // обновить страницу
    window.scrollTo(0, 0) // переместиться в самый верх страницы
  }

  return (
    <button
      type='button'
      disabled={isFetching}
      onClick={refreshPage}
      className='app__refresh_btn'>
      {content}
    </button>
  )
}

export default SubmitButton
