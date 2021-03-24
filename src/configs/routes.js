import HomePage from "../Routes/HomePage";
import GamePage from "../Routes/GamePage";
import AboutPage from "../Routes/AboutPage";
import ContactPage from "../Routes/ContactPage";

const routes = [
  {
    page: "HOME",
    href: "/",
    component: HomePage,
    isExact: true,
    isPrivate: false,
  },
  {
    page: "GAME",
    href: "/game",
    component: GamePage,
    isExact: false,
    isPrivate: true,
  },
  {
    page: "ABOUT",
    href: "/about",
    component: AboutPage,
    isExact: false,
    isPrivate: true,
  },
  {
    page: "CONTACT",
    href: "/contact",
    component: ContactPage,
    isExact: false,
    isPrivate: true,
  },
];

export default routes;
