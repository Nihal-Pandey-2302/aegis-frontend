import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        🛡️ Aegis
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active"><a href="#">📊 Dashboard</a></li>
          <li><a href="#">📜 My Policies</a></li>
          <li><a href="#">❓ How It Works</a></li>
          <li><a href="#">📞 Support</a></li>
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