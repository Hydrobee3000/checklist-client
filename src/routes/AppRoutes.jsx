import { Routes, Route } from 'react-router-dom'
import { checklistsData } from '../Pages/checklists/data_checklists' // данные всех чеклистов
import MainPage from '../Pages/mainPage/MainPage' // главная страница с навигацией
import AdminPage from '../Pages/admin/AdminPage' // панель администратора
import Checklist from '../Pages/checklists/Checklists'
import CreateForm from '../Pages/formCreation/CreateForm'

// статические ммашруты для основных элементов
const mainRoutes = [
  { path: '/', component: <MainPage /> },
  { path: '*', component: <MainPage /> },
  { path: '/adm', component: <AdminPage /> },
  { path: '/create', component: <CreateForm /> },
]

// динамические маршруты с отображением чеклистов
const checklistRoutes = checklistsData.map((checklist) => ({
  path: `/${checklist.id}`,
  component: <Checklist data={checklist} />,
}))

// маршруты всего приложения

const AppRoutes = () => {
  const allRoutes = [...mainRoutes, ...checklistRoutes]

  return (
    <Routes>
      {allRoutes.map((item) => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </Routes>
  )
}

export default AppRoutes
