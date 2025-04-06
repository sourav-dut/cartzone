import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { router } from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToastContainer } from 'react-toastify'
// import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    {/* <ScrollToTop /> */}
    <RouterProvider router={router} />
    <ToastContainer />
   </Provider>
  </StrictMode>,
)
