import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import BackgroundFX from '@/components/fx/BackgroundFX'
import Navbar, { AnnouncementBanner } from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import Home from '@/pages/Home'
import Product from '@/pages/Product'
import Pricing from '@/pages/PricingPage'
import Docs from '@/pages/Docs'
import Company from '@/pages/Company'
import Contact from '@/pages/Contact'
import SignIn from '@/pages/SignIn'
import Chat from '@/pages/Chat'
import NotFound from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isChatPage = pathname === '/chat'

  return (
    <div className="relative flex min-h-screen flex-col text-white selection:bg-fuchsia-500/30">
      <BackgroundFX />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isChatPage && <Footer />}
      {!isChatPage && <ChatWidget />}
      {!isChatPage && <AnnouncementBanner />}
    </div>
  )
}
