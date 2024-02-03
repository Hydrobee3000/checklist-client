import React from 'react'
import { Link } from 'react-router-dom'
import Header from './../../Components/Header/Header' // шапка странциы
import '../../App.css' // стили

// данные страниц(роутов)
const routeList = [
  //{ route: '/adm', title: 'Админка' },

  //{ route: '/yag1', title: 'ЯГОК ГПУ 1' },
  { route: '/yag2', title: 'Внесение несоответствий' },
  { route: '/yag43', title: 'ЯГОК УЭСО заколооборочник' },
]

// главная страница с навигацией

const MainPage = () => {
  return (
    <>
      <Header mainPage>Выберите чек-лист</Header>

      {/* Контент страницы */}
      <div className='app__content main_page__content'>
        <nav className='nav__list'>
          {routeList.map((item, i) => {
            return (
              <Link className='nav__link app__content_input' key={item.route} to={item.route}>
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default MainPage
