import React, { useEffect, useState } from 'react'
import { Button, notification, message } from 'antd'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

// регистрация service worker'a, с дополнительным функционалом, позволяющим пропускать ожидание нового service worker'a при нажатии на кнопку
// проверяет каждую минуту (период настраивается в serviceWorkerRegistration.js в функции registerValidSW )

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = useState(false) // показывать уведомление об обновлении
  const [waitingWorker, setWaitingWorker] = useState(null) // ожидание service worker'a
  const [api, contextHolder] = notification.useNotification()

  // called when a service worker updates. this function is a callback to the actual service worker
  // registration onUpdate.
  const onSWUpdate = (registration) => {
    setShowReload(true)
    setWaitingWorker(registration.waiting)
  }

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate }) // регистрация service worker
  }, [])

  //   говорит service worker'y пропустить фазу ожидания, а затем перезагрузить страницу
  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' })
    setShowReload(false)
    window.location.reload(true)
  }

  // кнопка в уведомлении
  const btn = (
    <Button type='primary' onClick={reloadPage}>
      Обновить
    </Button>
  )

  // ф-я вызывается при закрытии уведомления
  const openMessage = () => {
    message.open({
      type: 'info',
      content: (
        <Button type='dashed' size='small' onClick={reloadPage}>
          Обновить
        </Button>
      ),
      duration: 0,
    })
  }

  // ф-я открытия окна уведомлений
  function openNotification() {
    notification.open({
      btn,
      message: 'Доступно обновление!',
      description:
        'При нажатии кнопки [Обновить] - обновится приложение и сбросятся все заполненные данные, если вы в процессе заполнения - завершите чек-лист, отправьте его и затем нажмите "обновить" ',
      onClose: openMessage,
      duration: 0,
    })
  }

  if (showReload) {
    return (
      <>
        {contextHolder}
        {openNotification()}
      </>
    )
  }
}

export default ServiceWorkerWrapper
