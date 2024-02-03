import React, { useEffect, useReducer } from 'react'
import AppRoutes from './routes/AppRoutes' // роуты приложения
import Modals from './Components/Modals/Modals' // модальные окна приложения
import {
  checkStoredRecordsNumber, // ф-я проверки наличия хранимых записей для принудительной отправки
  requestsBroadcast,
  storedRecordsBroadcast,
} from './utils/serviceWorkerMessages' // общение с service worker
import {
  appContext,
  appReducer,
  initialState,
  setIsReplayFetching,
  setIsReplaySuccess,
  setShowModalReplay,
  setStoredRecordsNumber,
} from './store/reducers/appReducer'

//

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  //   useEffect(async () => {
  //     const url = "https://kadp-web-srv01.severstal.severstalgroup.com/dp/api/dp1/Param/List?id=18";
  //     let response = await fetch(url, {
  //         method: "GET",
  //     });
  //     let comm = await response.json();
  //     console.log(comm);
  // }, [])

  // useEffect(() => {
  //   checkStoredRecordsNumber()
  // }, [])

  // получение информации из sw (после завершения синхронизации)
  requestsBroadcast.onmessage = async (event) => {
    dispatch(setIsReplayFetching(false))
    dispatch(setShowModalReplay(event.data.showModalReplay))
    dispatch(setIsReplaySuccess(event.data.isReplaySuccess))
    dispatch(setIsReplayFetching(event.data.isReplayFetching))
  }

  // получаем из sw кол-во хранимых записей
  storedRecordsBroadcast.onmessage = async (event) => {
    dispatch(setStoredRecordsNumber(event.data.numberOfStoredRecords))
  }

  return (
    <appContext.Provider value={{ state, dispatch }}>
      <div className='app'>
        <Modals />
        <AppRoutes />

        {/* <SyncNotice
        storedRecordsNumber={storedRecordsNumber}
        isReplayFetching={isReplayFetching}
        setIsReplayFetching={setIsReplayFetching}
      /> */}
      </div>
    </appContext.Provider>
  )
}

export default App
