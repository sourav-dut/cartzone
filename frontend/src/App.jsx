import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'
import Profile from './pages/user/Profile'
import Dashboard from './pages/user/vendor/Dashboard'
import DashContent from './pages/user/vendor/DashContent'
import Product from './pages/user/vendor/Product'
import ProductDetails from './pages/user/customer/ProductDetails'
import ResetPassword from './pages/authentication/ResetPassword'
import Cart from './pages/user/customer/Cart'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDashContent from './pages/admin/AdminDashContent'
import AdminProduct from './pages/admin/AdminProduct'
import Address from './pages/user/Address'
import CheckoutPage from './pages/user/customer/CheckoutPage'
import OrderPage from './pages/admin/OrderPage'
import CustomerOrders from './pages/user/customer/CustomerOrders'
import Coustomers from './pages/admin/Coustomers'

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
        path: "signup",
        element: <Signup />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "/address/:userId",
        element: <Address />
      },
      {
        path: '/product/:productId',
        element: <ProductDetails />
      },
      {
        path: "/cart/:userId",
        element: <Cart />
      },
      {
        path: "/checkout/:userId",
        element: <CheckoutPage />
      },
      {
        path: "/order",
        element: <CustomerOrders />
      },
      // VENDOR
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
      // ADMIN
      {
        path: "/admin",
        element: < AdminDashboard/>,
        children: [
          {
            path: "",
            element: <AdminDashContent />
          },
          {
            path: "product",
            element: <AdminProduct />
          },
          {
            path: "orders",
            element: <OrderPage />
          },
          {
            path: "all-users",
            element: <Coustomers />
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
