import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { checklistsData } from '../../constants/data_checklists'
import Header from '../../Components/Header/Header' // шапка странциы
import '../../App.css' // стили
import { checkAPI } from '../../Api/Api'

// данные страниц(роутов)
const routeList = [
  //{ route: '/adm', title: 'Админка' },
  { route: '/create', title: 'Создать чеклист' },
  { route: '/checklist', title: 'Тестировочная форма' },
]

// главная страница с навигацией

const MainPage = () => {
  const [isFetching, setIsFetching] = useState(false) // происходит ли запрос
  const [isSuccess, setIsSuccess] = useState(false) // успешен ли запрос
  const [checklistsData, setСhecklistsData] = useState(false)

  console.log(checklistsData)
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

  if (isFetching === false && isSuccess === true) {
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
                <Link className='nav__link app__content_input' key={checklist._id} to={`${checklist._id}`}>
                  {checklist.formsName}
                </Link>
              )
            })}
          </nav>
        </div>
      </>
    )
  }
}

export default MainPage
