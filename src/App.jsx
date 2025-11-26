import { useEffect } from 'react';
import { initAnimations } from './utils/animations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import FunFacts from './components/FunFacts';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  useEffect(() => {
    initAnimations();
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Timeline />
      <FunFacts />
      <Footer />
    </div>
  );
}

export default App;
