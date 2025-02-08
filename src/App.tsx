import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PricingPage from './pages/PricingPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import FAQsPage from './pages/FAQsPage';
import ContactPage from './pages/ContactPage';
import WhatsAppChat from './components/WhatsAppChat';

export default function App() {
  return (
    <HashRouter>
      <WhatsAppChat />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}