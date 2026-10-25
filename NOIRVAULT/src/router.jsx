import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
      { path: "about", element: <About /> },
      { path: "checkout", element: <Checkout /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
