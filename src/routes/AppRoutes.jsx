import { Routes, Route } from 'react-router-dom'
import { FormRendererPage } from '../Pages/formRenderer/FormRendererPage'
import MainPage from '../Pages/main/MainPage' // главная страница с навигацией
import AdminPage from '../Pages/admin/AdminPage' // страница администратора
import FormCreationPage from '../Pages/formCreation/FormCreationPage' // страница создания формы
import { checklistsData } from '../constants/data_checklists' // данные всех чеклистов

// статические ммашруты для основных элементов

const mainRoutes = [
  { path: '/', component: <MainPage /> },
  { path: '*', component: <MainPage /> },
  { path: '/adm', component: <AdminPage /> },
  { path: '/create', component: <FormCreationPage /> },
]

// динамические маршруты с отображением чеклистов
const checklistRoutes = checklistsData.map((checklist) => ({
  path: `/${checklist.id}`,
  component: <FormRendererPage data={checklist} />,
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
