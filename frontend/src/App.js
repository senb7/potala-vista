import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import  { Explore }  from './pages/Explore';
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from './pages/AdminDashboard';
import VisitorSignup from "./pages/VisitorSignup";
import VisitorLogin from "./pages/VisitorLogin";
import VisitorDashboard from './pages/VisitorDashboard';
import AgencyLogin from './pages/AgencyLogin';
import { Packages } from './pages/Packages';
import AgencySignup from './pages/AgencySignup';
import AgencyDashboard from './pages/AgencyDashboard';

import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/visitor/signup" element={<VisitorSignup />} />
          <Route path="/visitor/login" element={<VisitorLogin />} />
          <Route path="/visitor/dashboard" element={<VisitorDashboard />} />
          <Route path="/agency/login" element={<AgencyLogin />} />
          <Route path="/agency/signup" element={<AgencySignup />} />
          <Route path="/agency/dashboard" element={<AgencyDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;