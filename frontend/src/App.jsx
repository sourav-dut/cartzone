import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'
import Profile from './pages/user/Profile'
import Dashboard from './pages/admin/Dashboard'
import DashContent from './pages/admin/DashContent'
import Product from './components/Product'
import ProductDetails from './pages/user/customer/ProductDetails'
import ResetPassword from './pages/authentication/ResetPassword'
import Cart from './pages/user/customer/Cart'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "/reset-password/:userId/:token",
        element: <ResetPassword />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: '/product/:productId',
        element: <ProductDetails />
      },
      {
        path: "/vendor",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <DashContent />
          },
          {
            path: "products",
            element: <Product />
          },
        ]
      },
      {
        path: "/admin",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <DashContent />
          },
          {
            path: "products",
            element: <Product />
          },
        ]
      }
    ],

  }
])

const App = () => {
  return (
    <>
      Hello
    </>
  )
}

export default App
