# 🛡️ Aegis Protocol

*A decentralized insurance protocol with dynamic, data-driven premiums, powered by Chainlink Functions.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/YOUR_USERNAME/aegis-frontend)
[![Project Status](https://img.shields.io/badge/Status-Feature_Complete-blue)](https://github.com/YOUR_USERNAME/aegis-frontend)

**Live Demo:** `YOUR_VERCEL_URL` (We will add this after we deploy)

---

Aegis brings a new level of sophistication to NFT insurance. Instead of static, inefficient pricing, Aegis uses Chainlink Functions to perform off-chain risk analysis based on live market data, ensuring premiums are always fair and reflective of an asset's true risk profile.

## The Problem It Solves

The NFT insurance market is young and inefficient. Current models use static premiums that don't account for the extreme volatility of digital assets. This means users often overpay for stable, blue-chip NFTs or are under-quoted for insuring new, high-risk assets. Aegis fixes this by introducing a dynamic, intelligent pricing model.

## How It Works: The Aegis Workflow

Our system uses a hybrid on-chain/off-chain architecture to achieve its goal.

1. **Quote Request (On-Chain):** A user selects an NFT in the DApp and requests an insurance quote. This calls the `createPolicyRequest` function on our `Aegis.sol` smart contract.
2. **Off-Chain Computation (Chainlink Functions):** The smart contract triggers a Chainlink Function, sending it the NFT's details. The Function's JavaScript source code securely executes off-chain.
3. **Live Data Fetching:** The script makes a real-time API call to a market data provider (like Reservoir) to fetch the NFT collection's current floor price.
4. **Risk Algorithm:** Our "AI" logic—a custom algorithm—combines the live floor price with other risk factors (like the NFT's simulated age) to calculate a final, dynamic premium.
5. **On-Chain Fulfillment:** The Chainlink DON delivers this calculated premium back to our `Aegis.sol` contract, which securely stores the quote.
6. **Policy Execution:** The user is prompted to approve a final transaction, paying the quoted premium to create an immutable insurance policy record on the blockchain.

*(A simple diagram created with a tool like [Excalidraw](https://excalidraw.com/) would be extremely effective here!)*

## Key Features

* **Dynamic, Data-Driven Premiums:** Utilizes Chainlink Functions to access real-world APIs for risk assessment.
* **Fully On-Chain Policies:** Insurance policies are created and stored as structs within the `Aegis.sol` smart contract, ensuring transparency and immutability.
* **Dynamic UI:** The frontend automatically updates when policies are created, visually moving an NFT from the "Uninsured" list to the "Active Policies" list.
* **Professional User Experience:** Features a polished dashboard layout, interactive modals, and real-time toast notifications for a smooth user journey.

## Tech Stack

* **Blockchain:** Ethereum (Sepolia Testnet)
* **Smart Contracts:** Solidity, OpenZeppelin, Hardhat (for Chainlink Functions toolkit)
* **Off-Chain Computation:** Chainlink Functions
* **Frontend:** React (Vite), Ethers.js, `react-hot-toast`
* **Deployment:** Remix IDE (Contracts), Vercel (Frontend)
* **Data & APIs:** Alchemy (NFT Data), Reservoir (Market Data)

## Getting Started

To run this project locally:

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/YOUR_USERNAME/aegis-frontend.git](https://github.com/YOUR_USERNAME/aegis-frontend.git)
    cd aegis-frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root and add your Alchemy API Key:
    `VITE_ALCHEMY_API_KEY=YOUR_ALCHEMY_KEY`
4. **Run the development server:**

    ```bash
    npm run dev
    ```

## How to Use the Aegis Demo

To test the Aegis Protocol, you will need a wallet funded with Sepolia ETH and at least one NFT on the Sepolia testnet.

### 1. Get Sepolia ETH

The Sepolia network requires ETH for gas fees. You can get free testnet ETH from a public faucet.

* **Recommended Faucet:** [Alchemy's Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)

### 2. Get a Testnet NFT

Once you have Sepolia ETH, you can mint a free, custom testnet NFT using the Bitbond Token Tool. This tool has a multi-step process.

* **NFT Minting Tool:** [Bitbond's Token Tool for Sepolia](https://tokentool.bitbond.com/create-nft/ethereum-sepolia)

* **Instructions:**
    1. **Create NFT Definition:** First, use the "Create NFT" page to define your NFT (e.g., give it a name like "My Test Asset"). This transaction creates the contract for your NFT collection.
    2. **Manage Metadata:** After creation, go to the "Manage" section of their tool. Here you can add a picture and other metadata to your NFT definition.
    3. **Mint the NFT:** Finally, go to the "Mint" section in the NFT minting page by clicking this link on the manage page. Select the NFT you just defined and mint it to your wallet address.
    4. **Check MetaMask:** After you approve the final minting transaction, the NFT should appear automatically in your MetaMask wallet under the "NFTs" tab. It will then be visible in the Aegis application.

## Project Repositories

* **Frontend:** `https://github.com/Nihal-Pandey-2302/aegis-frontend`
* **Backend (Smart Contracts & Logic):** `https://github.com/Nihal-Pandey-2302/aegis-backend`

## Deployed Contract

* **Aegis.sol on Sepolia Etherscan:**
    `https://sepolia.etherscan.io/address/0xed8a57ff5ED79e9F1803f486C6ad61c16f8ab6D3`

---
*This project was built for the [Chromium Hackathon] | June 2025*

