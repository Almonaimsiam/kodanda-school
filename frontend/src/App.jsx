// 🟦[TEMPLATE: APP_ROUTING_WITH_CONTEXT]
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import TopNoticeBar from './components/TopNoticeBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';

function PaymentSuccess() {
  const { tranId } = useParams();
  return (
    <div className="text-center mt-20 min-h-[50vh]">
      <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
      <p className="text-gray-700 mb-6">Transaction ID: {tranId}</p>
      <Link to="/" className="bg-primary text-white px-6 py-2 rounded font-bold">Return Home</Link>
    </div>
  );
}

function PaymentFail() {
  return (
    <div className="text-center mt-20 min-h-[50vh]">
      <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Payment Failed or Canceled</h1>
      <Link to="/payment" className="bg-primary text-white px-6 py-2 rounded font-bold">Try Again</Link>
    </div>
  );
}

function App() {
  return (
    // Wrap the entire app in LanguageProvider
    <LanguageProvider>
      <BrowserRouter>
        {/* Sticky elements at the top */}
        <TopNoticeBar />
        <Navbar />
        
        {/* Main Content Area */}
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success/:tranId" element={<PaymentSuccess />} />
            <Route path="/payment-fail" element={<PaymentFail />} />
            
            {/* Placeholders */}
            <Route path="/admission" element={<div className="text-center mt-20 text-2xl font-bold text-primary">Admission Page Coming Soon</div>} />
            <Route path="/teachers" element={<div className="text-center mt-20 text-2xl font-bold text-primary">Teachers Page Coming Soon</div>} />
            <Route path="/notice" element={<div className="text-center mt-20 text-2xl font-bold text-primary">Notice Board Coming Soon</div>} />
          </Routes>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;