import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { SkipLink } from './components/layout/SkipLink'
import { About } from './components/sections/About'
import { Certificates } from './components/sections/Certificates'
import { Contact } from './components/sections/Contact'
import { Focus } from './components/sections/Focus'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Technologies } from './components/sections/Technologies'

export default function App() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <About />
        <Focus />
        <Projects />
        <Technologies />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
