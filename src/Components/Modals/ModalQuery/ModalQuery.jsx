import React, { useContext, useEffect } from 'react'
import { appContext, setShowModal } from '../../../store/reducers/appReducer'
import s from '../Modals.module.css'

// модальное окно для отправки формы

const ModalQuery = () => {
  const { state, dispatch } = useContext(appContext)

  const { showModal, isSuccess } = state

  const onClose = () => {
    dispatch(setShowModal(false))
  }

  // закрытие на клавишу esc
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose()
    }
  }

  // слушатель нажатия на клавишу esc
  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])

  /* отобразим модальное окно только когда запрос завершен */
  if (showModal === true) {
    return (
      <div className={s.modal} onClick={onClose}>
        <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
          <div className={s.modal__header}>
            <h4 className={s.modal__title}>
              {isSuccess === true ? (
                // + если запрос успешно выполнен

                <p className={s.green}> Данные чек-листа успешно отправлены </p>
              ) : 'serviceWorker' in navigator ? (
                // - если не выполнен (с background sync)

                <p>
                  <span className={s.red}>Возникла ошибка во время отправки данных.</span>{' '}
                  <span style={{ marginLeft: '6px' }}>Данные</span>{' '}
                  <span className={s.green}>сохранены</span> и будут{' '}
                  <span className={s.green}>автоматически</span> отправлены позже
                </p>
              ) : (
                // - если не выполнен (без background sync)
                <p className='red'>При сохранении данных произошла ошибка</p>
              )}
            </h4>
          </div>
          <div className={s.modal__body}>
            {'serviceWorker' in navigator ? (
              // контент с background sync
              <>
                <br></br>
                {/* абзац про новую форму */}
                <p>
                  Для <strong className='green'>заполнения новой</strong> формы —{' '}
                  <strong>нажмите </strong> кнопку{' '}
                  <strong className='green'>[заполнить новый чек-лист]</strong> или{' '}
                  <strong>обновите </strong>
                  страницу
                </p>

                {/* абзац про принудительную отправку */}
                <p>
                  Для <strong className='green'>отправки всех</strong>, неудачно
                  отправленных ранее чек-листов (если таковые имеются) —{' '}
                  <strong>нажмите </strong> кнопку{' '}
                  <strong className='green'>[отправить все чек-листы]</strong>, которую
                  можно найти вверху любой страницы (сразу под шапкой приложения)
                  {/* <img className={s.modal__icon_sync} src={syncIcon} alt='Синхронизация' />{' '} */}
                  {/* в правом верхнем углу страницы */}
                </p>
              </>
            ) : (
              // контент без background sync
              <p>Пожалуйста, повторите отправку формы позднее</p>
            )}
          </div>
          <div className={s.modal__footer}>
            <button
              onClick={() => {
                onClose()
              }}
              className={`${s.modal__btn} ${s.modal__btn_ok}`}>
              Ок
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalQuery
