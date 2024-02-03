import { createContext } from 'react'

const SET_IS_SUCCESS = 'SET_IS_SUCCESS'
const SET_SHOW_MODAL = 'SET_SHOW_MODAL'
const SET_IS_REPLAY_SUCCESS = 'SET_IS_REPLAY_SUCCESS'
const SET_IS_REPLAY_FETCHING = 'SET_IS_REPLAY_FETCHING'
const SET_SHOW_MODAL_REPLAY = 'SET_SHOW_MODAL_REPLAY'
const SET_STORED_RECORDS_NUMBER = 'SET_STORED_RECORDS_NUMBER'

export const initialState = {
  count: 0,
  isSuccess: false, // успешно ли выполнена отправка формы
  showModal: false, // отобразить модальное окно при обычной отправке любой формы
  /* повторная отправка (синхронизация) */
  isReplaySuccess: null, // удачно ли завершилась операция повторной отправки (null | boolean)
  isReplayFetching: false, // происходил ли принудительная отправка
  showModalReplay: false, // отобразить модальное окно для принудительной отправки всех чек-листов
  storedRecordsNumber: 0, // количество неотправленных чек-листов, хранимых в БД
}

// создание конеткста с начальным состоянием
export const appContext = createContext(initialState)

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_SUCCESS:
      return { ...state, isSuccess: action.payload }
    case SET_SHOW_MODAL:
      return { ...state, showModal: action.payload }
    case SET_IS_REPLAY_SUCCESS:
      return { ...state, isReplaySuccess: action.payload }
    case SET_IS_REPLAY_FETCHING:
      return { ...state, isReplayFetching: action.payload }
    case SET_SHOW_MODAL_REPLAY:
      return { ...state, showModalReplay: action.payload }
    case SET_STORED_RECORDS_NUMBER:
      return { ...state, storedRecordsNumber: action.payload }
    default:
      throw new Error()
  }
}

/* 
Action creators
*/

export const setIsSuccess = (isSuccess) => ({ type: SET_IS_SUCCESS, payload: isSuccess })

export const setShowModal = (showModal) => ({ type: SET_SHOW_MODAL, payload: showModal })

export const setIsReplaySuccess = (isReplaySuccess) => ({
  type: SET_IS_REPLAY_SUCCESS,
  payload: isReplaySuccess,
})

export const setIsReplayFetching = (isReplayFetching) => ({
  type: SET_IS_REPLAY_FETCHING,
  payload: isReplayFetching,
})

export const setShowModalReplay = (showModalReplay) => ({
  type: SET_SHOW_MODAL_REPLAY,
  payload: showModalReplay,
})

export const setStoredRecordsNumber = (storedRecordsNumber) => ({
  type: SET_STORED_RECORDS_NUMBER,
  payload: storedRecordsNumber,
})
