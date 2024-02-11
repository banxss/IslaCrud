import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css'
import Landing from './pages/Landing';


function AppLayout() {
return (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Landing />} />
     
    </Routes>
    <Footer />
  </>
);
}


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>

  <Router>
    <AppLayout />
  </Router>

</React.StrictMode>
);