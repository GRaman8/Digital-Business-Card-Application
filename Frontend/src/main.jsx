import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {CardID} from './App.jsx'
import Signup from './Pages/Signup.jsx'
import Signin from './Pages/Signin.jsx'
import EditCard from './Pages/EditCardPage.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import NotFound from './Pages/NotFound.jsx'
import AddCard from './Pages/AddCardPage.jsx'


import ProtectedRoute from './Components/ProtectedRoute.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element: <Signup />},
  {path: "/signup", element: <Signup />},
  {path: "/signin", element: <Signin />},
  {path: "/cards", element: <App />},
  {path: "/cards/:cardId", element: <CardID />},
  {path: "/admin/dashboard", 
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {path: "/admin/edit/:cardId", 
    element: (
      <ProtectedRoute>
        <EditCard />
      </ProtectedRoute>
  )},
  {path: "/admin/add",
    element: (
      <ProtectedRoute>
        <AddCard />
      </ProtectedRoute>
    )},  
  {path: "*", element: <NotFound />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
