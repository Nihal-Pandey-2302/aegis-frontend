# 🛡️ Aegis Protocol - Frontend Interface

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Vercel-Live-brightgreen)](https://aegis-frontend-tau.vercel.app/)
[![Project Status](https://img.shields.io/badge/Status-Live_Demo_&_V3_Development-blue)](https://github.com/Nihal-Pandey-2302/aegis-frontend)

This repository contains the React frontend for the Aegis Protocol. It serves two purposes:
1.  The `main` branch powers our stable, live demonstration of the core V2 protocol.
2.  The `v3-upgrade` branch contains the latest user interface for interacting with our advanced **AegisV3 Autonomous Sentinel Protocol**.

---

## 🚀 Project Versions & Demos

### 1. Stable Live Demo (V2)

This is a functional demonstration of the core Aegis concept: dynamic NFT insurance powered by Chainlink Functions.

-   **✅ Live Demo URL:** **[https://aegis-frontend-tau.vercel.app/](https://aegis-frontend-tau.vercel.app/)**
-   **Contract Used:** `AegisV2.sol` on Sepolia ([View on Etherscan](https://sepolia.etherscan.io/address/0xa155016b9C39F500605F2e459A3335703b7053df))

### 2. The V3 Autonomous Sentinel (Post-Submission Upgrade)

This is the most advanced version of our protocol, featuring a multi-service architecture that uses **Chainlink Automation** to proactively trigger **Chainlink Functions** for autonomous loss detection.

-   **🎥 The Definitive V3 Demo:** **[Watch the Autonomous Sentinel in Action Here](https://your-new-video-link.com)**
    *(This video demonstrates the full, end-to-end functionality of the V3 protocol, which is the cornerstone of our final submission.)*

-   **V3 Contract:** `AegisV3.sol` on Sepolia ([View on Etherscan](https://sepolia.etherscan.io/address/0xd2Ce8CAb8285EA661ea2C6490f0f8467A39f9673))
-   **V3 Frontend Code:** Available on the **[`v3-upgrade` branch of this repository](https://github.com/Nihal-Pandey-2302/aegis-frontend/tree/v3-upgrade)**.

---

## ⚙️ Running This Project Locally

### To Run the V3 Autonomous Demo Frontend (Recommended for Developers)

1.  **Clone this repository:**
    ```bash
    git clone https://github.com/Nihal-Pandey-2302/aegis-frontend.git
    cd aegis-frontend
    ```
2.  **Switch to the `v3-upgrade` branch:**
    ```bash
    git checkout v3-upgrade
    ```
3.  **Install dependencies and set up your environment:**
    Create a `.env` file in the root and add your Alchemy API Key: `VITE_ALCHEMY_API_KEY=YOUR_ALCHEMY_KEY`
    ```bash
    npm install
    ```
4.  **Update the contract address** in `src/config/contract.js` to point to the `AegisV3` address if needed.
5.  **Run the development server:**
    ```bash
    npm run dev
    ```

### To Run the Stable V2 Demo Frontend
Follow the steps above, but stay on the `main` branch.

---

## 🔗 Project Repositories

-   **Backend & Protocol HQ (Monorepo):** The main project documentation and `AegisV3.sol` smart contract can be found here: **[Aegis-Protocol](https://github.com/Nihal-Pandey-2302/Aegis-Protocol)**

---

*This project was built for the Chromium Hackathon | June 2025*
