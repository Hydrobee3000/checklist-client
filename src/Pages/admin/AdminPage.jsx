import React from 'react'
import { checkAPI } from '../../Api/Api'
import Header from '../../Components/Header/Header'
import { Table } from 'antd'
import '../../App.css'
import 'antd/dist/antd.css'

// свойства пагинации
const pagination = {
  defaultPageSize: 50, // изначально - 100 записей на страницу
  pageSizeOptions: ['50', '100'], // выбор количества записей на страницу
  position: ['topRight'], // расположение элемента пагинации
}

const AdminPage = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'name', // заголовок
      dataIndex: 'name', // свойство из сервера, из которого все данные записываются в данный столбец
    },

    {
      title: 'startTime',
      dataIndex: 'startTime',
    },
    {
      title: 'complTime',
      dataIndex: 'complTime',
    },
    {
      title: 'dateCreated',
      dataIndex: 'dateCreated',
    },
    {
      title: 'dateModified',
      dataIndex: 'dateModified',
    },
    {
      title: 'isSend',
      dataIndex: 'isSend',
    },
  ]

  React.useEffect(() => {
    setLoading(true) // показываем загрузку

    checkAPI
      .getForms()
      .then((resp) => {
        setData(resp.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className='app'>
      <Header />
      <div className='app__content'>
        <Table
          className='table-striped-rows'
          loading={loading} // загрузчик
          bordered
          size='small'
          dataSource={data} // данные таблицы
          columns={columns} // столбцы таблицы
          pagination={pagination} // свойства пагинации
          rowKey='id' // ключ, по которому можно найти все стобцы в строке
        />
      </div>
    </div>
  )
}

export default AdminPage
