import ModalQuery from './ModalQuery/ModalQuery' // модальное окно для отправке формы
import ModalReplay from './ModalReplay/ModalReplay' // модальное окно для принудительной отправки

// объединяет все модальные окна в одном месте

const Modals = () => {
  return (
    <>
      {/* модальное окно отправки формы */}
      <ModalQuery />
      {/* модальное окно принудительной отправки всех чек-листов */}
      <ModalReplay />
    </>
  )
}

export default Modals
