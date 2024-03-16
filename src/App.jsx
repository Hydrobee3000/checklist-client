import React, { useEffect, useReducer, useState } from 'react'
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
import { checkAPI } from './Api/Api'

//

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const [isFetching, setIsFetching] = useState(false) // происходит ли запрос
  const [isSuccess, setIsSuccess] = useState(false) // успешен ли запрос
  const [checklistsData, setСhecklistsData] = useState(null)

  useEffect(() => {
    setIsFetching(true)

    checkAPI
      .getTemplates() // отправка данных на сервер
      .then((res) => {
        setСhecklistsData(res.data)
        setIsSuccess(true)
      })
      .catch((error) => {
        setIsSuccess(false)
        console.error(error)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [])

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

  if (checklistsData || (isFetching === false && isSuccess === true)) {
    return (
      <appContext.Provider value={{ state, dispatch }}>
        <div className='app'>
          <Modals />
          <AppRoutes checklistsData={checklistsData} />

          {/* <SyncNotice
        storedRecordsNumber={storedRecordsNumber}
        isReplayFetching={isReplayFetching}
        setIsReplayFetching={setIsReplayFetching}
      /> */}
        </div>
      </appContext.Provider>
    )
  }

  return <p>подождите</p>
}

export default App
