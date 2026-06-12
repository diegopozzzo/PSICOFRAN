import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Reservar from './pages/Reservar'
import Talleres from './pages/Talleres'
import Admin from './pages/Admin'
import Links from './pages/Links'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  // La página de enlaces (bio de Instagram) va sola, sin menú ni pie
  const standalone = pathname === '/links'

  return (
    <div className="grain min-h-[100dvh]">
      {!standalone && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/talleres" element={<Talleres />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/links" element={<Links />} />
      </Routes>
      {!standalone && <Footer />}
      {!standalone && <WhatsAppFloat />}
    </div>
  )
}
