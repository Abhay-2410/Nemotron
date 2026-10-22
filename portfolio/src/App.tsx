import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import PixelScene from './components/PixelScene'
import Projects from './components/Projects'
import Results from './components/Results'
import SnapshotSection from './components/SnapshotSection'
import TechStack from './components/TechStack'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-text">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <PixelScene fixed />
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 min-w-0">
        <Navbar />
        <main className="min-w-0">
          <Hero />
          <SnapshotSection />
          <TechStack />
          <Projects />
          <Experience />
          <Results />
        </main>
        <Footer />
      </div>
    </div>
  )
}
