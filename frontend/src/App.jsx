// import { BrowserRouter, Routes, Route, Navigate, RouterProvider } from 'react-router-dom'
// import { createBrowserRouter } from 'react-router-dom'

// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import Dashboard from './pages/Dashboard'
// import Dashboard from './pages/Dashboard2'
// import './App.css'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Home from './pages/Home'
import AuthInitializer from './compoenets/AuthInitializer'
import AppRoute from './routes/AppRoute'

// const router = createBrowserRouter([
//   { path: '/', Component: Home },
//   { path: '/login', Component: Login },
//   { path: '/signup', Component: Signup },
//   { path: '/dashboard', Component: Dashboard },
// ]);

function App() {

  return (
    // <RouterProvider router={router} />/
    <AuthInitializer>
      <AppRoute />
    </AuthInitializer>
  )
}

export default App
