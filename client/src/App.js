import { Fragment } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Page/Root";
import HomePage from "./Page/HomePage";
import ShopPage from "./Page/ShopPage";
import DetailPage from "./Page/DetailPage";
import CartPage from "./Page/CartPage";
import CheckoutPage from "./Page/CheckoutPage";
import LoginPage from "./Page/LoginPage";

import HistoryPage from "./Page/HistoryPage";

function App()
{
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        { index: true, element: <HomePage></HomePage> },
        { path: "shop", element: <ShopPage></ShopPage> },
        { path: "detail/:productId", element: <DetailPage></DetailPage> },
        { path: "cart", element: <CartPage></CartPage> },
        { path: "checkout", element: <CheckoutPage></CheckoutPage> },
        { path: "login", element: <LoginPage></LoginPage> },
       
        { path: 'history', element: <HistoryPage></HistoryPage> }
      ],
    },
  ]);
  return (
    <Fragment>
      <RouterProvider router={router}></RouterProvider>
    </Fragment>
  );
}

export default App;
