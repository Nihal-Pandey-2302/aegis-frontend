

import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        🛡️ Aegis
      </div>
      <nav className="sidebar-nav">
        <ul>
          {/* Replace a href with NavLink to */}
          <li><NavLink to="/">📊 Dashboard</NavLink></li>
          <li><NavLink to="/policies">📜 My Policies</NavLink></li>
          <li><NavLink to="/how-it-works">❓ How It Works</NavLink></li>
        </ul>
      </nav>
      <div className="sidebar-stats">
        <h4>Protocol Stats</h4>
        <div className="stat-item">
          <span className="stat-label">Total Value Insured</span>
          <span className="stat-value">$1,234,567</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active Policies</span>
          <span className="stat-value">1,432</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Supported Collections</span>
          <span className="stat-value">88</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;