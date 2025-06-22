import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Alchemy, Network } from 'alchemy-sdk';
import InsuranceModal from './components/InsuranceModal.jsx';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const AEGIS_CONTRACT_ADDRESS = "0xed8a57ff5ED79e9F1803f486C6ad61c16f8ab6D3";
const AEGIS_ABI = [{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"subscriptionId","type":"uint64"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"}],"name":"createPolicyRequest","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"},{"internalType":"string","name":"donIdString","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EmptyArgs","type":"error"},{"inputs":[],"name":"EmptySource","type":"error"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"}],"name":"executePolicy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"bytes","name":"response","type":"bytes"},{"internalType":"bytes","name":"err","type":"bytes"}],"name":"handleOracleFulfillment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"NoInlineSecrets","type":"error"},{"inputs":[],"name":"OnlyRouterCanFulfill","type":"error"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"}],"name":"StringsInsufficientHexLength","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"policyId","type":"uint256"},{"indexed":true,"internalType":"address","name":"policyHolder","type":"address"},{"indexed":false,"internalType":"address","name":"nftContract","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"PolicyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"requestId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"premium","type":"uint256"}],"name":"QuoteReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestSent","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getPoliciesByOwner","outputs":[{"components":[{"internalType":"uint256","name":"policyId","type":"uint256"},{"internalType":"address","name":"policyHolder","type":"address"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"},{"internalType":"uint256","name":"premiumPaid","type":"uint256"},{"internalType":"uint256","name":"coverageValue","type":"uint256"},{"internalType":"uint64","name":"expirationTimestamp","type":"uint64"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct Aegis.Policy[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"policies","outputs":[{"internalType":"uint256","name":"policyId","type":"uint256"},{"internalType":"address","name":"policyHolder","type":"address"},{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"},{"internalType":"uint256","name":"premiumPaid","type":"uint256"},{"internalType":"uint256","name":"coverageValue","type":"uint256"},{"internalType":"uint64","name":"expirationTimestamp","type":"uint64"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_donId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"s_pendingQuotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const CHAINLINK_SUBSCRIPTION_ID = "5065";
const alchemy = new Alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY, network: Network.ETH_SEPOLIA });

function Layout() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  
  const [allNfts, setAllNfts] = useState([]);
  const [insuredNfts, setInsuredNfts] = useState([]);
  const [uninsuredNfts, setUninsuredNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const [quotes, setQuotes] = useState({});
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [activePolicies, setActivePolicies] = useState([]);  


  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(newProvider);
    }
  }, []);

  useEffect(() => {
    if (!contract) return;
  
    const handleQuoteEvent = (requestId, premium) => {
      console.log("QuoteReceived event:", requestId, premium.toString());
  
      // Update selectedNft if relevant
      if (selectedNft && selectedNft.lastRequestId === requestId) {
        setSelectedNft(prev => ({ ...prev, quote: premium }));
      }
  
      // Optionally update quotes state if you use it
      setQuotes(prev => ({ ...prev, [requestId]: premium }));
    };
  
    contract.on("QuoteReceived", handleQuoteEvent);
    return () => contract.off("QuoteReceived", handleQuoteEvent);
  }, [contract, selectedNft]);
  

  
  // Fetch all user data when the account or contract changes
  useEffect(() => {
    const fetchAllData = async () => {
      if (!contract || !account) return;
      setIsLoading(true);
    
      try {
        // Fetch NFTs owned by user
        const nftsForOwner = await alchemy.nft.getNftsForOwner(account);
        const fetchedNfts = nftsForOwner.ownedNfts.filter(nft => nft.name && nft.image?.cachedUrl);
        setAllNfts(fetchedNfts);
    
        // Fetch policies on-chain
        const policiesFromChain = await contract.getPoliciesByOwner(account);
    
        // Create a map of NFTs keyed by "contractAddress-tokenId"
        const nftMap = {};
        fetchedNfts.forEach(nft => {
          nftMap[`${nft.contract.address.toLowerCase()}-${nft.tokenId.toString()}`] = nft;
        });
    
        // Enrich policies with NFT metadata
        const enrichedPolicies = policiesFromChain.map(policy => {
          const key = `${policy.nftContractAddress.toLowerCase()}-${policy.nftTokenId.toString()}`;
          return {
            ...policy,
            ...nftMap[key], // add NFT metadata (name, image, etc) if exists
          };
        });
    
        // Build insured & uninsured lists
        const insuredIdSet = new Set(
          policiesFromChain.map(p => `${p.nftContractAddress.toLowerCase()}-${p.nftTokenId.toString()}`)
        );
    
        const insuredList = [];
        const uninsuredList = [];
    
        fetchedNfts.forEach(nft => {
          const key = `${nft.contract.address.toLowerCase()}-${nft.tokenId.toString()}`;
          if (insuredIdSet.has(key)) {
            insuredList.push(nft);
          } else {
            uninsuredList.push(nft);
          }
        });
    
        setActivePolicies(enrichedPolicies);
        setInsuredNfts(insuredList);
        setUninsuredNfts(uninsuredList);
    
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Could not fetch your data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [account, contract]);
  

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const newContract = new ethers.Contract(AEGIS_CONTRACT_ADDRESS, AEGIS_ABI, signer);
        setAccount(accounts[0]);
        setContract(newContract);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this application.");
    }
  };

  const handleOpenModal = (nft) => {
    setSelectedNft(nft);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNft(null);
  };

  


  const handleCreatePolicy = async (nft) => {
    if (!contract) return toast.error("Please connect your wallet first.");
    
    handleCloseModal();
    const toastId = toast.loading('1/2: Please approve quote request...');
  
    try {
      const requestTx = await contract.createPolicyRequest(
        CHAINLINK_SUBSCRIPTION_ID, 
        nft.contract.address, 
        nft.tokenId
      );
      
      toast.loading('2/2: Request sent! Waiting for oracle...', { id: toastId });
  
      const receipt = await requestTx.wait();
      const event = receipt.events.find(e => e.event === 'RequestSent');
      if (!event) {
        throw new Error("Could not find RequestSent event in transaction logs.");
      }
      const requestId = event.args.id;
      console.log("Request sent. Waiting for fulfillment. Request ID:", requestId);
  
      // Set up a listener for the specific response
      contract.once(contract.filters.QuoteReceived(requestId), async (reqId, premium) => {
        console.log("Quote received from oracle:", ethers.utils.formatEther(premium), "ETH");
        toast.loading('Quote received! Please approve final payment...', { id: toastId, icon: "🔔" });
        
        try {
          const executeTx = await contract.executePolicy(requestId, nft.contract.address, nft.tokenId, { value: premium });
          await executeTx.wait();
          
          toast.success(`Policy for ${nft.name} created!`, { id: toastId, duration: 4000 });
          await fetchAllData(); // Refresh all data from the blockchain
  
        } catch (execError) {
          console.error("Policy execution failed:", execError);
          toast.error(`Execution failed: ${execError.reason || "Check console."}`, { id: toastId });
        }
      });
  
    } catch (error) {
      console.error("Quote request failed:", error);
      toast.error(`Request failed: ${error.reason || "Check console."}`, { id: toastId });
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="app-layout">
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar />
      <div className="main-app-content">
        <header className="app-header">
          <div></div>
          {account ? (
            <div className="wallet-info">{truncateAddress(account)}</div>
          ) : (
            <button onClick={connectWallet} className="connectButton">Connect Wallet</button>
          )}
        </header>
        <div className="content-wrapper">
          {/* Outlet now passes all necessary data and functions to the child routes */}
          <Outlet context={{ 
            account, 
            isLoading, 
            uninsuredNfts, 
            activePolicies,
            handleOpenModal 
          }} />
        </div>
        <Footer />
      </div>
      {isModalOpen && (
        <InsuranceModal 
          nft={selectedNft}
          onClose={handleCloseModal}
          onConfirm={handleCreatePolicy}
        />
      )}
    </div>
  );
}

export default Layout;