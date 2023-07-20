import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { LOGO_URL } from "./utils/constants"
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import RestaurantMenu from './components/RestaurantMenu';
import ErrorBoundary from "./components/ErrorBoundary";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


const AppLayout = () => {

  return (
    <React.Fragment>
      <Header logo={LOGO_URL} />
      <Outlet />
    </React.Fragment>
  )
}
const About = lazy(() => import("./components/About"))
const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/about',
        element: <Suspense fallback={<h1>loading...</h1>}><About /></Suspense>
      },
      {
        path: '/contact-us',
        element: <Contact />
      },
      {
        path: '/my-cart',
        element: <Cart />
      },
      {
        path: '/restaurants/:resId',
        element: <RestaurantMenu />
      }
    ],
    errorElement: <ErrorBoundary />
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={routerConfig} />);
