import s from './Header.module.css';

const Header = ({ title = null, descr = null }) => {
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.container}>
        {title && <h1>{title}</h1>}
        {descr && <p>{descr}</p>}
      </div>
    </header>
  );
};

export default Header;
