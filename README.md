# 🛡️ Aegis Protocol

**Dynamic On-Chain NFT Insurance powered by Chainlink Functions.**

---

### Elevator Pitch

Aegis is a decentralized insurance protocol that brings real-world, data-driven risk analysis to the NFT space. Unlike traditional static insurance models, Aegis uses Chainlink Functions to fetch live market data and calculate a dynamic premium in real-time, ensuring users pay a fair price based on the current risk associated with their valuable digital assets.

### The Problem

The NFT insurance market is nascent and inefficient. Premiums are static and fail to account for the highly volatile and rapidly changing nature of NFT collections. Users either overpay for insurance on stable assets or are under-quoted for high-risk, trending assets.

### Our Solution

Aegis solves this by acting as an automated, intelligent insurance underwriter.

1. **User Selects NFT:** A user connects their wallet and selects an NFT they wish to insure from their collection.
2. **Dynamic Quoting:** Aegis triggers a Chainlink Function. This function runs a secure, off-chain JavaScript script that fetches live market data (like the collection's floor price from the Reservoir API) and combines it with on-chain data characteristics (like the NFT's age, simulated by its token ID).
3. **On-Chain Policy Creation:** The script returns a single, dynamically calculated premium to the `Aegis.sol` smart contract. The user can then accept this quote and pay the premium in ETH to create an immutable, on-chain insurance policy.

![Aegis Workflow Diagram](https://i.imgur.com/your-diagram-url.png)
*(You can create a simple diagram using a tool like Excalidraw or FigJam and upload the image to Imgur to get a link)*

---

### Key Features

* **Dynamic Premium Calculation:** Core logic runs off-chain using Chainlink Functions to access real-world APIs.
* **Fully On-Chain Policies:** All created policies are stored immutably in the `Aegis.sol` smart contract.
* **Interactive Frontend:** A polished React application provides a seamless user experience for connecting a wallet, viewing NFTs, requesting quotes, and creating policies.
* **Real-Time Notifications:** The DApp uses on-chain event listeners and toast notifications to keep the user informed of the multi-step insurance process.

### Tech Stack

* **Blockchain:** Ethereum (Sepolia Testnet)
* **Smart Contracts:** Solidity, OpenZeppelin
* **Off-Chain Computation:** Chainlink Functions
* **Frontend:** React (Vite), Ethers.js, react-hot-toast
* **Data & APIs:** Alchemy (NFT API), Reservoir (Market Data API)
* **Development & Deployment:** Remix IDE, Hardhat (for Functions Toolkit)

---

### Getting Started

1. Clone the frontend and backend repositories.
2. Install dependencies: `npm install`
3. Create a `.env` file with your `SEPOLIA_RPC_URL` and `PRIVATE_KEY`.
4. Run the frontend: `npm run dev`

### Deployed Contracts

* **Aegis.sol:** `0xed8a57ff5ED79e9F1803f486C6ad61c16f8ab6D3` on Sepolia

---

*This project was built for the Chromium Hackathon in June 2025.*
