import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import PageNotFound from './pages/NotFoundPage';
import { AlertProvider } from './context/alert/AlertContext';
import Alert from './components/layout/Alert';
import User from './pages/User';

function App() {
  return (
    <AlertProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />

          <main className="container mx-auto px-3 pb-12">
            <Alert />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/user/:login" element={<User />} />
              <Route path="/notfound" element={<PageNotFound />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AlertProvider>
  );
}

export default App;
