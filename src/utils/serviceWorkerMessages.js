export const requestsBroadcast = new BroadcastChannel('requests-channel') // сообщения в service worker из клиента
export const storedRecordsBroadcast = new BroadcastChannel('stored-records-channel') // канал для связи service wroker'a с клиентом
export const syncButtonBroadcast = new BroadcastChannel('sync-button-channel') // канал для связи service wroker'a с клиентом

// функция проверки наличия хранимых записей для принудительной отправки
export const checkStoredRecordsNumber = () => {
  storedRecordsBroadcast.postMessage({ type: 'CHECK_NUMBER_STORED_RECORDS' }) // отправка сообщения в sw для получения кол-во хранимых записей
}
