import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";

import musicICO from "./MusicICO.json";
import musicNFT from "./MusicNFT.json";
import theBlockchainCoders from "./TheBlockchainCoders.json";

//OWNER ADDRESS
export const OWNER_ADDRESS = "0xfFFd2E17F10e37065aF2e96a7CdBDc01D2e4fA9D";
export const VERIFY_AMOUNT = 5.00000;
export const CREDIT_AMOUNT = 0.00005;
export const REWARD_TOKEN = 5;
export const rewardLock = 5;

//OLD
// TOKEN tco
export const thebBlockchainCoders_Add =
  "0xB70b81FbcCa28ee403E9c9C1842389FC19ce1709";
//NEW
// export const thebBlockchainCoders_Add =
//   "0x016BdD1d5D941621818ac0Fec64Bf4b0b75f0A73";
const theBlockchainCoders_ABI = theBlockchainCoders.abi;

//ICO1 CONTRACT 0x2A9008aF2827941138F58E6a893FC3C76e5ADC17
//tcro ico contract
//ico2 contract below
const musicICO_Address = "0xf7b1C82f676a7b34F97033B4A4F5C6b30c18A424";
const musicICO_ABI = musicICO.abi;
//MUSIC NFT CONTRACT

//tcro music nft
export const musicNFT_Address = "0x7Cdc892faeE76F51Bb6559E9336959eC10878d39";
//NEW
// export const musicNFT_Address = "0x7E3d0d1dD2B81f5D399762Fb0d181dA50c137F5b";
const musicNFT_ABI = musicNFT.abi;

//NETWORK
const networks = {
  cronos: {
    chainId: `0x${Number(25).toString(16)}`,
    chainName: "Cronos",
    nativeCurrency: {
      name: "CRO",
      symbol: "CRO",
      decimals: 18,
    },
    rpcUrls: ["https://evm.cronos.org"],
    blockExplorerUrls: ["https://cronoscan.com/"],
  },
  cronos_testnet: {
    chainId: `0x${Number(338).toString(16)}`,
    chainName: "Cronos Testnet",
    nativeCurrency: {
      name: "tCRO",
      symbol: "tCRO",
      decimals: 18,
    },
    rpcUrls: ["https://evm-t3.cronos.org"],
    blockExplorerUrls: ["https://explorer.cronos.org/testnet"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

const handleNetworkSwitch = async () => {
  const networkName = "cronos_testnet";
  await changeNetwork({ networkName });
};

export const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");
    const network = await handleNetworkSwitch();
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object");
  }
};

//---FETCHING SMART CONTRACT
const fetchContract = (address, abi, signer) =>
  new ethers.Contract(address, abi, signer);

//---MUSIC NFT
export const MUSIC_NFT_CONTARCT = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(musicNFT_Address, musicNFT_ABI, signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

//---MUSIC ICO
export const MUSIC_ICO_CONTARCT = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(musicICO_Address, musicICO_ABI, signer);
    console.log('Contract read')
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const fetchMusicNFT = async (_tokenId) => {
  try {
    connectWallet();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = fetchContract(musicNFT_Address, musicNFT_ABI, signer);

    const musicData = await contract.getMusicNFTDetails(_tokenId);
    const tokenURI = await contract.tokenURI(_tokenId);

    console.log(tokenURI);

    const musicInfo = await axios.get(tokenURI, {});

    const musicNFT = {
      title: musicInfo.data.title,
      fileURL: musicInfo.data.fileURL,
      imageURL: musicInfo.data.imageURL,
      description: musicInfo.data.description,
      owner: musicData.owner,
      seller: musicData.seller,
      tokenId: _tokenId,
    };

    console.log(musicNFT);
    return musicNFT;
  } catch (error) {
    console.log(error, "Error while fetching music NFT");
  }
};
