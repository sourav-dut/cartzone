import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'

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
        path: "signup",
        element: <Signup />
      },
    ]
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
