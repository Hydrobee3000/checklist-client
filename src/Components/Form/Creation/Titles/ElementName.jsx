import React from 'react'
import { Typography } from 'antd'

/**
 * Компонент для отображения названия элемента формы'.
 *
 * @param {React.ReactNode} props.children - Дочерние элементы компонента.
 * @returns {JSX.Element} Компонент React.
 */
const ElementName = ({ children }) => {
  return (
    <Typography level={2} style={{ marginBottom: '10px', fontWeight: 'bold' }}>
      {children}
    </Typography>
  )
}

export default ElementName
