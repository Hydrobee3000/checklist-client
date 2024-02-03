import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import ServiceWorkerWrapper from './ServiceWorkerWrapper'
import ScrollToTop from './Components/common/ScrollToTop'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* регистрация service worker'a c обновлением sw без ожидания */}
    <ServiceWorkerWrapper />
    {/* роутер приложения */}
    <HashRouter>
      {/* поднимает фокус на самый верх при междустраничных переходах */}
      <ScrollToTop />
      <App />
    </HashRouter>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// serviceWorkerRegistration.register() // сервисный работник регистрируется в ./ServiceWorkerWrapper.jsx

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
