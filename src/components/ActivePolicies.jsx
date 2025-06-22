import React from 'react';
import './ActivePolicies.css';

function ActivePolicies({ insuredNfts }) {
  const getRemainingTime = (expiration) => {
    const now = new Date().getTime() / 1000;
    const remaining = expiration - now;
    if (remaining <= 0) return "Expired";
    const days = Math.floor(remaining / 86400);
    return `${days}d left`;
  };

  return (
    <div className="policies-container">
      <h3>Active Policies</h3>
      {insuredNfts.length > 0 ? (
        <div className="policies-list">
          {insuredNfts.map(nft => (
            <div key={nft.policyId} className="policy-card">
              <img src={nft.image.cachedUrl} alt={nft.name} />
              <div className="policy-info">
                <h4>{nft.name}</h4>
                <p>Expires: {getRemainingTime(nft.expirationTimestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="policies-list-placeholder">
          <p>Your insured NFTs will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default ActivePolicies;