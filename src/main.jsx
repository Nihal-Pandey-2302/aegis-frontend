import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// We no longer import Layout. Instead, we import Dashboard directly.
import Dashboard from './Dashboard.jsx'; 
import HowItWorks from './components/HowItWorks.jsx';
import ActivePolicies from './components/ActivePolicies.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The Dashboard component, with its own complete layout, is now the root page */}
        <Route path="/" element={<Dashboard />} />

        {/* The other pages will be rendered on their own */}
        <Route path="how-it-works" element={<HowItWorks />} />

        {/* Note: This page will not have the sidebar unless we add it, which we can do later if needed */}
        <Route path="policies" element={
            <div className="main-content" style={{padding: '2rem'}}>
              <ActivePolicies policies={[]} />
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);