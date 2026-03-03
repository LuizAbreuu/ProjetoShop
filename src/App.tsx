import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home/Home';
import { Carrinho } from './pages/cart/Carrinho';
import { Details } from './pages/details/index';

import { Layout } from "./components/layout/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Carrinho />
      },
      {
        path: "/product/:id",
        element: <Details />
      }
    ]
  }
]);

export {router};