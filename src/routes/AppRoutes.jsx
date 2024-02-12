import { Routes, Route } from 'react-router-dom'
import { checklistsData } from '../Pages/formRenderer/data_checklists' // данные всех чеклистов
import { FormRenderer } from '../Pages/formRenderer/FormRenderer'
import CreateForm from '../Pages/formCreation/FormCreation'
import MainPage from '../Pages/mainPage/MainPage' // главная страница с навигацией
import AdminPage from '../Pages/admin/AdminPage' // панель администратора

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
  component: <FormRenderer data={checklist} />,
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
