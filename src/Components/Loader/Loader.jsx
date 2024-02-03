import s from './Loader.module.css'

// спиннер загрузки

const Loader = () => {
  return (
    <div className={s.loader__container}>
      <div className={s.loader}></div>
    </div>
  )
}

export default Loader
