import { Routes, Route } from 'react-router-dom'
import MainPage from '../Pages/mainPage/MainPage' // главная страница с навигацией
import AdminPage from '../Pages/admin/AdminPage' // панель администратора
import ChecklistWithState from '../Pages/checklists/Checklists'

// все роуты

const routeConfig = [
  { path: '/', component: <MainPage /> },
  { path: '*', component: <MainPage /> },
  { path: '/adm', component: <AdminPage /> },
  { path: '/checklist', component: <ChecklistWithState /> },
]

// роутинг приложения
const AppRoutes = () => {
  return (
    <Routes>
      {routeConfig.map((item) => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </Routes>
  )
}

export default AppRoutes
