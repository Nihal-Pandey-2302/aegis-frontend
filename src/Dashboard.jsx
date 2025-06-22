import React from 'react';
import { useOutletContext } from 'react-router-dom';
import NftGallery from './components/NftGallery';
import ActivePolicies from './components/ActivePolicies';
import './styles/Dashboard.css';

function Dashboard() {
  // Receive all data from the parent Layout component via the context hook
  const { account, isLoading, uninsuredNfts, activePolicies, handleOpenModal } = useOutletContext();

  return (
    <main className="app-container">
      <div className="main-content">
        {account ? (
          isLoading ? (
            <div className="loading-state">Loading Your Dashboard...</div>
          ) : (
            <>
              <div className="hero-section">
                <h2>Protect Your Digital Assets</h2>
                <p>Aegis offers dynamic, on-demand insurance for your valuable NFTs. Select an asset below to get a real-time risk assessment and premium quote.</p>
              </div>
              <div className="content-columns">
                <div className="left-column">
                  <NftGallery uninsuredNfts={uninsuredNfts} onInsureClick={handleOpenModal} />
                </div>
                <div className="right-column">
                  <ActivePolicies policies={activePolicies} />
                </div>
              </div>
            </>
          )
        ) : (
          <div className='loading-state'>
            <h2>Welcome to Aegis</h2>
            <p>Please connect your wallet to view and insure your NFTs.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Dashboard;