import { Link } from 'react-router-dom'
import HomeLink from './HomeLink' // кнопка "домой"
import SyncNotice from '../common/SyncNotice/SyncNotice' // блок уведомления о принудительной отправке
import s from './Header.module.css'

// 'шапка' всех страниц

const Header = ({ children, mainPage = false }) => {
  const buildDate = process.env.REACT_APP_BUILD_DATE  // получаем дату сборки 

  return (
    <>
      <div
        className={
          mainPage
            ? `${s.container__header} + ${s.main_page_color}`
            : `${s.container__header}`
        }>
        <div
          className={
            mainPage
              ? `${s.header__content} + ${s.header__content_main_page}`
              : `${s.header__content}`
          }
          title='Вернуться на главную' // tooltip
        >
          {/* кнопка 'домой' отображается на всех страницах, кроме главной */}
          {mainPage ? null : <HomeLink />}
          <h1 className={s.header__title}>{children}</h1>
        </div>
        <Link className={s.header__version} to='/adm'>
          {buildDate}              {/* $((Build.BuildNumber)) */}
        </Link>
      </div>
      <SyncNotice />
    </>
  )
}

export default Header
