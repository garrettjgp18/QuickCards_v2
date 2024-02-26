import Navbar from './components/Navbar'
import CreatePage from './pages/CreatePage'
import Landing from './pages/Landing'
import Words from './pages/Words'
import { Route, Routes, Router } from 'react-router-dom'

function App() {

  //only render Navbar when it is NOT "/"
  //To render navbar - wrap <MainLayout> <ComponentName /> </MainLayout> in route
  const MainLayout = ({ children }) => (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
  

  return (
    <>
    <div>
      <Routes>
        <Route path = "/" element = { <Landing /> } />
        <Route path="/create" element={<MainLayout><CreatePage /></MainLayout>} />
        <Route path="/words" element={<MainLayout><Words /></MainLayout>} />
      </Routes>
    </div>
    </>
  )
}

export default App
