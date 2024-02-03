import React from 'react'
import s from './SyncNotice.module.css'

// Плашка уведомления о доступности service worker'a

export default function SwNotice() {
  if (!'serviceWorker' in navigator) {
    // Service Worker is not supported
    let serviceWorkerMessage = null
    let SyncManagerMessage = null

    serviceWorkerMessage = 'Автономный режим не доступен (service-worker не обнаружен)'
    if (!'SyncManager' in window) {
      SyncManagerMessage = 'Фоновая синхронизация не доступна (SyncManager не обнаружен)'
    }
    // Service Worker and Background Sync are not supported
    return (
      <div className={s.container__sync_note}>
        <div className={s.sync_note} style={{ backgroundColor: '#b95353' }}>
          <p className={s.sync_note__content}>{serviceWorkerMessage}</p>
          {SyncManagerMessage ? <p className={s.sync_note__content}>{SyncManagerMessage}</p> : null}
        </div>
      </div>
    )
  } else {
    // Service Worker is supported
    return null
  }
}
