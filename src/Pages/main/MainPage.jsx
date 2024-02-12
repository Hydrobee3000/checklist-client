import React from 'react'
import { Link } from 'react-router-dom'
import { checklistsData } from '../../constants/data_checklists'
import Header from '../../Components/Header/Header' // шапка странциы
import '../../App.css' // стили

// данные страниц(роутов)
const routeList = [
  //{ route: '/adm', title: 'Админка' },
  { route: '/create', title: 'Создать чеклист' },
  { route: '/checklist', title: 'Тестировочная форма' },
]

// главная страница с навигацией

const MainPage = () => {
  return (
    <>
      <Header mainPage>Выберите опрос</Header>
      {/* Контент страницы */}
      <div className='app__content main_page__content'>
        <nav className='nav__list'>
          <Link className='nav__link app__content_input' key={'/create'} to={'/create'}>
            Создать чеклист
          </Link>

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
