import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import Success from './pages/Success';
import Fail from './pages/Fail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Services from './pages/Services';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Fail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
