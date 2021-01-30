import s from './Layout.module.css';

const Layout = (props) => {
  const {
    id = null,
    title = null,
    descr = null,
    urlBg = null,
    colorBg = null,
  } = props;

  const styleBg = {
    backgroundImage: urlBg && `url(${urlBg})`,
    backgroundColor: colorBg,
  };

  return (
    <section className={s.root} id={id} style={styleBg}>
      <div className={s.wrapper}>
        <article>
          {title && (
            <div className={s.title}>
              <h3>{title}</h3>
              <span className={s.separator}></span>
            </div>
          )}
          {descr && (
            <div className={[s.desc, s.full].join(' ')}>
              <p>{descr}</p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Layout;
