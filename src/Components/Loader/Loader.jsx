import loaderImg from "./assets/walking-pikachu.gif";

import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <img src={loaderImg} alt="Walking Pikachu" />
      <h3 className={s.loaderText}>
        Loading<span>...</span>
      </h3>
    </div>
  );
};

export default Loader;
