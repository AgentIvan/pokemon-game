import React from 'react';
import s from './Layout.module.css';

const Layout = (props) => {
  const { children, id = null, urlBg = null, colorBg = null } = props;

  const styleBg = {
    backgroundImage: urlBg && `url(${urlBg})`,
    backgroundColor: colorBg,
  };

  const childrenArray = React.Children.toArray(children);
  const [title = null, ...content] = childrenArray;
  const isContentExist = content.length > 0;

  return (
    <section className={s.root} id={id} style={styleBg}>
      <div className={s.wrapper}>
        <article>
          {title && (
            <div className={s.title}>
              {title}
              <span className={s.separator}></span>
            </div>
          )}
          {isContentExist && (
            <div className={[s.content, s.full].join(' ')}>{content}</div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Layout;
