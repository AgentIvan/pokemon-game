import { useState } from "react";
import Axios from "../../services/axios";
import { NotificationManager } from "react-notifications";

import Menu from "./Menu";
import Navbar from "./Navbar";
import Modal from "../Modal";
import LoginForm from "../LoginForm";

const MenuNavbar = ({ isBgActive }) => {
  const [isMenuActive, setMenuActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMenuBtnClick = () => {
    setMenuActive((isMenuActive) => !isMenuActive);
  };

  const handleMenuItemClick = () => {
    setMenuActive(false);
  };

  const handleLoginBtnClick = () => {
    setModalOpen(true);
  };

  const handleModalCloseClick = () => {
    setModalOpen(false);
  };

  const handleLoginFormSubmit = async ({ email, password, isSignUp }) => {
    const authTypePath = isSignUp ? "signUp" : "signInWithPassword";

    try {
      const authOptions = { email, password, returnSecureToken: true };

      const response = await Axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${authTypePath}?key=AIzaSyDu4a3NSPv2ylKOGWIV79NqVuN-9R-ikFs`,
        authOptions
      );
      const { idToken } = response;
      localStorage.setItem("idToken", idToken);

      NotificationManager.success("Auth succeded", "Success");

      setModalOpen(false);
    } catch ({ response: { data } }) {
      NotificationManager.error(data.error.message, "Error");
    }
  };

  return (
    <div>
      <Navbar
        isMenuActive={isMenuActive}
        isBgActive={isBgActive}
        onMenuBtnClick={handleMenuBtnClick}
        onLoginBtnClick={handleLoginBtnClick}
      />
      <Menu isMenuActive={isMenuActive} onMenuItemClick={handleMenuItemClick} />
      <Modal
        title="Authentification form"
        isOpen={isModalOpen}
        onCloseClick={handleModalCloseClick}
      >
        {isModalOpen && <LoginForm onFormSubmit={handleLoginFormSubmit} />}
      </Modal>
    </div>
  );
};

MenuNavbar.defaultProps = {
  isBgActive: false,
};

export default MenuNavbar;
