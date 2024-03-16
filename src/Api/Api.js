import axios from 'axios'

/*  prod --- package.json  =>  "homepage": "/checklist",  */

// const prodURL = window.location.protocol + '//' + window.location.hostname + '/checklist/api' // url в режиме production

const prodURL = 'https://checklist-server-4qbi.onrender.com/api/' // url в режиме development
const devUrl = 'https://checklist-server-4qbi.onrender.com/api/' // url в режиме development
// const devUrl = 'https://localhost:5000' // url в режиме development

const baseURL = process.env.NODE_ENV === 'development' ? devUrl : prodURL // url в зависимости от режима

/* настройка axios */
axios.interceptors.request.use(
  (config) => {
    config.url = baseURL + config.url
    config.headers['Content-Type'] = 'application/json'

    return config
  },
  (err) => Promise.reject(err)
)

export const checkAPI = {
  // отправка заполненных форм (чек-листов) на сервер
  async postData(data) {
    const json = JSON.stringify(data)

    return axios.post('/form', JSON.stringify({ data: json }))
  },

  // получение всех чек-листов из БД (для админки)
  async getForms() {
    return axios.get('/checklists')
  },

  // отправка шаблона формы (чек-листа) на сервер
  async postTemplate(data) {
    return axios.post('/template', data)
  },

  // получение всех шаблонов чек-листов из БД (для заполнения)
  async getTemplates() {
    return axios.get('/templates')
  },
}
