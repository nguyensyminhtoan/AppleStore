import { Fragment } from "react";

import { Outlet } from "react-router-dom";
import MainNavigation from "../Component/MainNavigation.js";
import Footer from "../Component/Footer.js";
import PopupMess from "../Component/PopupMess.js";

export default function Root() {
  return (
    <Fragment>
      <MainNavigation></MainNavigation>
      <Outlet></Outlet>
      <PopupMess></PopupMess>
      <Footer></Footer>
    </Fragment>
  );
}
