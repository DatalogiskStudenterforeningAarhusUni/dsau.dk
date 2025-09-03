import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Events from './pages/Events'
import Underforeninger from './pages/Underforeninger'
import Board from './pages/Board'
import About from './pages/About'
import Contact from './pages/Contact'
import Matroska from './pages/Matroska'
import Popcorn from './pages/Popcorn'
import Rc from './pages/Rc'
import { I18nProvider, type Lang } from './i18n/I18nContext'

function LangLayout() {
  const params = useParams()
  const lang = (params.lang === 'en' ? 'en' : 'da') as Lang
  return (
    <I18nProvider lang={lang}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </I18nProvider>
  )
}

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Routes>
        <Route path="/" element={<Navigate replace to="/da" />} />
        <Route path=":lang" element={<LangLayout />}>
          <Route index element={<Events />} />
          <Route path="underforeninger" element={<Underforeninger />} />
          <Route path="bestyrelsen" element={<Board />} />
          <Route path="om" element={<About />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="matroska" element={<Matroska />} />
          <Route path="popcorn" element={<Popcorn />} />
          <Route path="rc" element={<Rc />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
