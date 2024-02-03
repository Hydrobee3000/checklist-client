import homeIcon from '../../assets/home.svg'
import { Link } from 'react-router-dom'
import s from './Header.module.css'

// кнопка "домой" (на главную)

const HomeLink = () => {
  return (
    <Link to='/' className={s.header__link_home}>
      <img className={s.header__icon_home} src={homeIcon} alt='На главную' />
    </Link>
  )
}

export default HomeLink
