import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Info from './pages/Info';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Details from './pages/Details';
import LayfansTerms from './pages/LayfansTerms';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/golfcourse.png')" }}
    >
      <div className="min-h-screen flex flex-col bg-primary-color/80">
        <UserProvider>
          <Router>
            <Navbar />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/info" element={<Info />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/layfans-terms" element={<LayfansTerms />} />
                <Route path="/admin" element={<Admin />} />
                <Route
                  path="/details"
                  element={
                    <SignedIn>
                      <Details />
                    </SignedIn>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <SignedOut>
                      <Login />
                    </SignedOut>
                  }
                />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </UserProvider>
      </div>
    </div>
  );
};

export default App;
