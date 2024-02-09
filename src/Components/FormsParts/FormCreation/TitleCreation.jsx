import React from 'react'
import { Typography } from 'antd'

/**
 * Компонент для отображения заголовка элемента вопроса.
 *
 * @param {React.ReactNode} props.children - Дочерние элементы компонента.
 * @returns {JSX.Element} Компонент React.
 */
const TitleCreation = ({ children }) => {
  return (
    <Typography level={2} style={{ marginBottom: '10px', fontWeight: 'bold' }}>
      {children}
    </Typography>
  )
}

export default TitleCreation
