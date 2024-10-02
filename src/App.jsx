/* eslint-disable no-unused-vars */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./Pages/Account";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import Register from "./Pages/Register";

import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Pages/ProductDetails";
import Collections from "./Pages/Collections";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Contact from "./Pages/Contact";
import Checkout from "./Pages/Checkout";
import Context from "./Pages/Context";
import Shipping from "./Pages/Shipping";
import ExchangePolicy from "./Pages/ExchangePolicy";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      },

      {
        path: "/exchange-policy",
        element: <ExchangePolicy />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/collections/:name",
        element: <Collections />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
function App() {
  return (
    <Context>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Context>
  );
}

export default App;

/* <div className="flex items-center justify-center">
        <Login />
      </div>*/
/* <div className="flex-grow">
        <Cart />
      </div>*/
