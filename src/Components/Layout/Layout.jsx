import React from 'react';
import cn from 'classnames';

import s from './Layout.module.css';

const Layout = (props) => {
  const { children, id, urlBg, colorBg } = props;

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
            <div className={cn(s.content, s.full)}>{content}</div>
          )}
        </article>
      </div>
    </section>
  );
};

Layout.defaultProps = {
  id: null,
  urlBg: null,
  colorBg: null,
};

export default Layout;
