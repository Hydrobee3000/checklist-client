import React, { useContext, useEffect } from 'react'
import { appContext, setShowModalReplay } from '../../../store/reducers/appReducer'
import s from '../Modals.module.css'

// модальное окно для принудительной отправки всех чек-листов

const ModalReplay = () => {
  const { state, dispatch } = useContext(appContext)

  const { showModalReplay, isReplaySuccess, storedRecordsNumber } = state

  const onClose = () => {
    dispatch(setShowModalReplay(false))
  }

  //закрытие на клавишу esc
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose()
    }
  }

  //слушатель нажатия на клавишу esc
  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])

  /* отобразим модальное окно только когда !повторный запрос завершен */
  if (showModalReplay === true) {
    return (
      <div className={s.modal} onClick={onClose}>
        <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
          <div className={s.modal__header}>
            <h4 className={s.modal__title}>
              {isReplaySuccess === true ? (
                // + если запрос успешно выполнен
                <p style={{ color: 'green' }}>Данные чек-листов успешно отправлены </p>
              ) : 'serviceWorker' in navigator ? (
                // - если не выполнен (с background sync)
                <p>
                  <span style={{ color: 'red', marginRight: '7px' }}>Произошла ошибка во время отправки. </span>
                  <span>Попробуйте позже</span>
                </p>
              ) : (
                // - если не выполнен (без background sync)
                <p style={{ color: 'red' }}>При сохранении данных произошла ошибка</p>
              )}
            </h4>
          </div>

          <div className={s.modal__body}>
            {isReplaySuccess === true ? (
              // + если запрос успешно выполнен
              <p>Все чек-листы успешно отправлены</p>
            ) : (
              // - если не выполнен
              <>
                <p>
                  Чек-листы по-прежнему <strong>находятся в</strong> процессе фоновой
                  <strong> синхронизации</strong> и будут пытаться <strong>автоматически</strong> отправиться
                </p>
                <p>
                  Количество чек-листов, ожидающих загрузки: <strong className='red'>{storedRecordsNumber}</strong>
                </p>
              </>
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

export default ModalReplay
