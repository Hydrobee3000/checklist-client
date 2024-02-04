import React from 'react'
import { Link } from 'react-router-dom'
import Header from './../../Components/Header/Header' // шапка странциы
import '../../App.css' // стили
import { checklistsData } from '../checklists/data_checklists'

// данные страниц(роутов)
const routeList = [
  //{ route: '/adm', title: 'Админка' },

  //{ route: '/yag1', title: 'ЯГОК ГПУ 1' },
  // { route: '/yag2', title: 'Внесение несоответствий' },
  { route: '/checklist', title: 'Тестировочная форма' },
]

// главная страница с навигацией

const MainPage = () => {
  return (
    <>
      <Header mainPage>Выберите чек-лист</Header>
      {/* Контент страницы */}
      <div className='app__content main_page__content'>
        <nav className='nav__list'>
          {checklistsData.map((checklist) => {
            return (
              <Link className='nav__link app__content_input' key={checklist.id} to={`${checklist.id}`}>
                {checklist.formsName}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default MainPage
