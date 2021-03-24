import { useEffect, useRef } from "react";
import cn from "classnames";

import s from "./Modal.module.css";

const Modal = ({ children, title, isOpen, onCloseClick }) => {
  const modalOverlay = useRef();

  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("style", "overflow: hidden;");
    } else {
      document.body.removeAttribute("style");
    }
  }, [isOpen]);

  const handleOverlayClick = ({ target }) => {
    if (target === modalOverlay.current) {
      onCloseClick();
    }
  };

  return (
    <div
      ref={modalOverlay}
      className={cn(s.root, { [s.open]: isOpen })}
      onClick={handleOverlayClick}
    >
      <div className={s.modal}>
        <div className={s.head}>
          {title}
          <span className={s.btnClose} onClick={onCloseClick}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  title: "",
  isOpen: false,
  onCloseBtnClick: () => {},
};

export default Modal;
