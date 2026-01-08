import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { SocialProof } from './components/sections/SocialProof';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { TechStack } from './components/sections/TechStack';
import { Contact } from './components/sections/Contact';
import { Background } from './components/ui/Background';
import { SEO } from './components/SEO';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

function App() {
  return (
    <HelmetProvider>
      <SEO
        title="DevStudio - Desarrollo Full Stack de Alto Nivel"
        description="Soluciones robustas de software para problemas complejos. Desarrollo Web, Mobile, Arquitectura de Datos y BI Analytics. Transformo datos en decisiones y visiones en software."
        url="https://devstudio.com"
      />
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative">
        <Background />
        <Navbar />
        <main>
          <Hero />
          <SocialProof />
          <Services />
          <Portfolio />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
