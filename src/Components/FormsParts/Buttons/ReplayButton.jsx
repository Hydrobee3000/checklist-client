import { useState } from 'react'
import { requestsBroadcast } from '../../../utils/serviceWorkerMessages' // канал для связи с Service Worker

/* Кнопка принудительной повторной отправки */

const ReplayButton = ({}) => {
  const [isReplayFetching, setIsReplayFetching] = useState(false) // происходит ли запрос повторной отправки

  // вызов принудительной повторной отправки
  const handleReplay = () => {
    setIsReplayFetching(true) // запрос начался - блокируем кнопку
    // отправляем сообщение в SW о том, что этот запрос является принудительной повторной отправкой
    requestsBroadcast.postMessage({ type: 'FORCE_REPLAY_REQUEST' })
  }

  return (
    <button type='button' className='app__content_btn' onClick={handleReplay} disabled={isReplayFetching}>
      Принудительно отправить
    </button>
  )
}

export default ReplayButton
