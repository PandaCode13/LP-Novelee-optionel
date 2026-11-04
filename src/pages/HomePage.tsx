import AboutSection from '../features/landing/AboutSection'
import ContactSection from '../features/landing/ContactSection'
import HeroSection from '../features/landing/HeroSection'
import ProblemSection from '../features/landing/ProblemSection'
import SolutionSection from '../features/landing/SolutionSection'
import BetaSignupSection from '../features/beta/BetaSignupSection'

function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <div className="trust-strip" aria-label="Les essentiels Novelee">
        <div className="section-inner trust-inner">
          <span><strong>1 livre</strong> en commun suffit</span>
          <span className="trust-divider" aria-hidden="true" />
          <span><strong>0 spoiler</strong> non désiré</span>
          <span className="trust-divider" aria-hidden="true" />
          <span><strong>100 %</strong> à ton rythme</span>
        </div>
      </div>
      <ProblemSection />
      <SolutionSection />
      <AboutSection />
      <BetaSignupSection />
      <ContactSection />
    </main>
  )
}

export default HomePage
