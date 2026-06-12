import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import SobreMi from './pages/SobreMi'
import Metodo from './pages/Metodo'
import FAQPage from './pages/FAQPage'
import Reservar from './pages/Reservar'
import Talleres from './pages/Talleres'
import Admin from './pages/Admin'
import Links from './pages/Links'

export default function App() {
  const { pathname } = useLocation()
  const standalone = pathname === '/links'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="grain min-h-[100dvh]">
      {!standalone && <Nav />}
      <div key={pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/sobre-mi" element={<SobreMi />} />
          <Route path="/metodo" element={<Metodo />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/reservar" element={<Reservar />} />
          <Route path="/talleres" element={<Talleres />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </div>
      {!standalone && <Footer />}
      {!standalone && <WhatsAppFloat />}
    </div>
  )
}
