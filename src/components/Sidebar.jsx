import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { Alchemy, Network } from 'alchemy-sdk';
import "../styles/Sidebar.css";

const AEGIS_CONTRACT_ADDRESS = "0xed8a57ff5ED79e9F1803f486C6ad61c16f8ab6D3";
const AEGIS_ABI = [{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"subscriptionId","type":"uint64"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"}],"name":"createPolicyRequest","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"},{"internalType":"string","name":"donIdString","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EmptyArgs","type":"error"},{"inputs":[],"name":"EmptySource","type":"error"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"}],"name":"executePolicy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"bytes","name":"response","type":"bytes"},{"internalType":"bytes","name":"err","type":"bytes"}],"name":"handleOracleFulfillment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"NoInlineSecrets","type":"error"},{"inputs":[],"name":"OnlyRouterCanFulfill","type":"error"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"}],"name":"StringsInsufficientHexLength","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"policyId","type":"uint256"},{"indexed":true,"internalType":"address","name":"policyHolder","type":"address"},{"indexed":false,"internalType":"address","name":"nftContract","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"PolicyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"requestId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"premium","type":"uint256"}],"name":"QuoteReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestSent","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getPoliciesByOwner","outputs":[{"components":[{"internalType":"uint256","name":"policyId","type":"uint256"},{"internalType":"address","name":"policyHolder","type":"address"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"},{"internalType":"uint256","name":"premiumPaid","type":"uint256"},{"internalType":"uint256","name":"coverageValue","type":"uint256"},{"internalType":"uint64","name":"expirationTimestamp","type":"uint64"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct Aegis.Policy[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"policies","outputs":[{"internalType":"uint256","name":"policyId","type":"uint256"},{"internalType":"address","name":"policyHolder","type":"address"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"},{"internalType":"uint256","name":"premiumPaid","type":"uint256"},{"internalType":"uint256","name":"coverageValue","type":"uint256"},{"internalType":"uint64","name":"expirationTimestamp","type":"uint64"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_donId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"s_pendingQuotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const CHAINLINK_SUBSCRIPTION_ID = "5065";
const alchemy = new Alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY, network: Network.ETH_SEPOLIA });
function Sidebar({ account, activePolicies, uninsuredNfts = [] }) {

  // Calculate user-specific stats
  const userActivePolicies = activePolicies.filter(p => p.isActive);
  const totalCoverageWei = userActivePolicies.reduce((acc, policy) => acc.add(policy.coverageValue), ethers.BigNumber.from(0));
  const totalCoverageEth = ethers.utils.formatEther(totalCoverageWei);

  const totalPremiumWei = userActivePolicies.reduce((acc, policy) => acc.add(policy.premiumPaid), ethers.BigNumber.from(0));
  const totalPremiumEth = ethers.utils.formatEther(totalPremiumWei);



  const policiesNearExpiry = userActivePolicies.filter(p => {
    const expiry = Number(p.expirationTimestamp);
    const now = Math.floor(Date.now() / 1000);
    return expiry - now <= 7 * 24 * 60 * 60; // within 7 days
  });
  
  const mostRecentPolicy = userActivePolicies.reduce((latest, p) => {
    return (p.expirationTimestamp > latest.expirationTimestamp ? p : latest);
  }, { expirationTimestamp: 0 });
  
  const averageCoverage = userActivePolicies.length > 0
    ? ethers.utils.formatEther(totalCoverageWei.div(userActivePolicies.length))
    : "0.0";
  

  
  return (
    <aside className="sidebar">
      <Link to="/">
        <div className="sidebar-logo">🛡️ Aegis</div>
      </Link>

      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/">📊 Dashboard</NavLink></li>
          <li><NavLink to="/policies">📜 My Policies</NavLink></li>
          <li><NavLink to="/how-it-works">❓ How It Works</NavLink></li>
        </ul>
      </nav>

      {account && (
      <div className="sidebar-stats">
        <h4>Your Stats</h4>
        <div className="stat-item">
          <span className="stat-label">Active Policies</span>
          <span className="stat-value">{userActivePolicies.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Coverage</span>
          <span className="stat-value">{totalCoverageEth} ETH</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Premium Paid</span>
          <span className="stat-value">{totalPremiumEth} ETH</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg Coverage per Policy</span>
          <span className="stat-value">
            {userActivePolicies.length > 0
              ? (Number(totalCoverageEth) / userActivePolicies.length).toFixed(3)
              : "0.000"} ETH
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Expiring Soon</span>
          <span className="stat-value">{policiesNearExpiry.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Uninsured NFTs</span>
          <span className="stat-value">{uninsuredNfts.length}</span>
        </div>
      </div>
    )}


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