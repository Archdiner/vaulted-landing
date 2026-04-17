import { Navbar } from './components/Navbar';
import { Scrollytelling } from './components/Scrollytelling';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#F7F5F2] text-[#111111] font-sans antialiased selection:bg-[#F5A623] selection:text-black min-h-screen">
      <Navbar />
      <Scrollytelling />
      <CTASection />
      <Footer />
    </div>
  );
}
