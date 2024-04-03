import Navbar from './components/Navbar'
import CreatePage from './pages/CreatePage'
import Landing from './pages/Landing'
import Words from './pages/Words'
import Register from './pages/Register'
import LogIn from './pages/LogIn'
import Settings from './pages/Settings'
import Cards from './pages/Cards'

import { Route, Routes, Router } from 'react-router-dom'

function App() {

  //only render Navbar when it is NOT "/"
  //To render navbar - wrap <MainLayout> <ComponentName /> </MainLayout> in route
  const MainLayout = ({ children }) => (
    <>
      <Navbar />
      {children}
    </>
  );
  

  return (
    <>
    <div>
      <Routes>
        <Route path = "/" element = { <Landing /> } />
        <Route path="/create" element={<MainLayout><CreatePage /></MainLayout>} />
        <Route path="/words" element={<MainLayout><Words /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        <Route path="/login" element={<MainLayout><LogIn /></MainLayout>} />
        <Route path="/cards" element={<MainLayout><Cards /></MainLayout>} />

      </Routes>
    </div>
    </>
  )
}

export default App
