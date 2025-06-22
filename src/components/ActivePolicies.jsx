import React from 'react';
import '../styles/ActivePolicies.css';

function ActivePolicies({ policies = [] }) {
  const getRemainingTime = (expiration) => {
    const expirationTimestamp = Number(expiration.toString());
    const now = Date.now() / 1000;
    const remaining = expirationTimestamp - now;
    if (remaining <= 0) return "Expired";
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    return `${days}d ${hours}h left`;
  };

  return (
    <div className="policies-container">
      <h3>Active Policies</h3>
      {policies.length > 0 ? (
        <div className="policies-list">
          {policies.map(policy => (
            <div key={policy.policyId} className="policy-card">
              {policy.image?.cachedUrl ? (
                <img src={policy.image.cachedUrl} alt={policy.name || "NFT Image"} />
              ) : (
                <div className="no-image-placeholder">No image</div>
              )}
              <div className="policy-info">
                <h4>{policy.name || `Token #${policy.nftTokenId}`}</h4>
                <p>Expires: {getRemainingTime(policy.expirationTimestamp)}</p>
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
