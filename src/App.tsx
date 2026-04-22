import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { InvoiceDetails } from './pages/InvoiceDetails';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;