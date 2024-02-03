import { useContext } from 'react'
import { appContext, setIsReplayFetching } from '../../../store/reducers/appReducer'
import { requestsBroadcast } from '../../../utils/serviceWorkerMessages'
import s from './SyncNotice.module.css'

// Плашка уведомления о наличии сохраненных неотправленных чек-листов

const SyncNotice = () => {
  const { state, dispatch } = useContext(appContext)

  let storedRecordsNumber = state.storedRecordsNumber
  let isReplayFetching = state.isReplayFetching

  // вызов принудительной повторной отправки
  const handleReplay = () => {
    dispatch(setIsReplayFetching(true)) // запрос начался - блокируем кнопку
    requestsBroadcast.postMessage({ type: 'FORCE_REPLAY_REQUEST' }) // отправляем сообщение в SW о том, что запрос принудительный
  }

  // Показываем кнопку только, если присутствуют неотправленные чек-листы
  if (storedRecordsNumber > 0) {
    return (
      <div className={s.container__sync_note}>
        <div className={s.sync_note}>
          <p className={s.sync_note__content}>
            Обнаружены неотправленные чек-листы в количестве: <span className={s.content__number_records}>{storedRecordsNumber}</span>
          </p>
          {/* блок кнопки */}
          <div className={s.container__sync_btn}>
            <button className={s.sync_btn} onClick={handleReplay} disabled={isReplayFetching}>
              {isReplayFetching === true ? 'Подождите..' : 'Отправить все чек-листы'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default SyncNotice
