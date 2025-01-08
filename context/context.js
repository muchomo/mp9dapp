import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

//INTERNAL  IMPORT
import {
  MUSIC_NFT_CONTARCT,
  MUSIC_ICO_CONTARCT,
  connectWallet,
  fetchMusicNFT,
  musicNFT_Address,
  OWNER_ADDRESS,
  VERIFY_AMOUNT,
  CREDIT_AMOUNT,
  REWARD_TOKEN,
  rewardLock,
} from "./constants";

export const MusicNFTContext = React.createContext();

export const MusicNFTProvider = ({ children }) => {
  const MUSIC_DAPP = "Music Dapp";
  const currency = "tCRO";
  const network = "cronos_testnet";

  const [loader, setLoader] = useState(false);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  //---CREATENFT FUNCTION
  const createMusicNFT = async (title, fileURL, imageURL, description) => {
    if (!title || !fileURL || !imageURL || !description)
      return console.log("Data Is Missing");

    const data = JSON.stringify({ title, fileURL, imageURL, description });
    //
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `054753291470d772a9a3`,
          pinata_secret_api_key: `8ec1ac46e3d100ad1ba7511aa84f1eedd5b54e6de47a2f5bf382484a1e45bb9f`,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      const returnData = await createSale(url);
      return returnData;
    } catch (error) {
      console.log(error, "error here");
    }
  };

  //--- createSale FUNCTION
  const createSale = async (url) => {
    try {
      const address = await connectWallet();
      const contract = await MUSIC_NFT_CONTARCT();

      const currentTokenId = await contract._tokenIds();

      const transaction = await contract.createToken(url);

      await transaction.wait();

      const details = {
        transaction,
        currentTokenId: currentTokenId.toNumber() + 1,
      };
      return details;
    } catch (error) {
      console.log(error, "or error here");
    }
  };

  //--- ICO
  const musicICO = async () => {
    try {
      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();
      console.log("contract grabbed");
      const toeknDetails = await contract.getTokenDetails();
      console.log("details received");
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();

      const maticBal = await signer.getBalance();

      const TBC_TOKEN = {
        toeknBal: ethers.utils.formatEther(toeknDetails.balance.toString()),
        supply: ethers.utils.formatEther(toeknDetails.supply.toString()),
        tokenPrice: ethers.utils.formatEther(
          toeknDetails.tokenPrice.toString()
        ),
        tokenAddr: toeknDetails.tokenAddr,
        maticBal: ethers.utils.formatEther(maticBal.toString()),
        address: address.toLowerCase(),
      };

      return TBC_TOKEN;
      // return maticBal;
     
    } catch (error) {
      console.log(error, "error here too");
    }
  };

  //BUY TOKEN
  const buyToken = async (amount) => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const toeknDetails = await contract.getTokenDetails();
      const avalableToken = ethers.utils.formatEther(
        toeknDetails.balance.toString()
      );

      if (avalableToken > 1) {
        const price =
          ethers.utils.formatEther(toeknDetails.tokenPrice.toString()) *
          Number(amount);

        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        console.log(payAmount);

        const transaction = await contract.buyToken(Number(amount), {
          value: payAmount.toString(),
          //gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction successfully");
        console.log(transaction);
      }
    } catch (error) {
      console.log(error, "this error");
      notifyError("error try again later");
      setLoader(false);
    }
  };

  //TRANSFER ETHER
  const transferEther = async (amount, _receiver) => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const payAmount = ethers.utils.parseUnits(amount.toString(), "ether");

      const transaction = await contract.transferEther(_receiver, payAmount, {
        value: payAmount.toString(),
        gasLimit: ethers.utils.hexlify(8000000),
      });

      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction successfully");
      console.log(transaction);
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  ///VERIFY_ACCOUNT
  const transferToOwnerAcc = async (VERIFY_AMOUNT) => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const payAmount = ethers.utils.parseUnits(
        VERIFY_AMOUNT.toString(),
        "ether"
      );

      const transaction = await contract.transferToOwner(payAmount, {
        value: payAmount.toString(),
        //gasLimit: ethers.utils.hexlify(8000000),
      });

      await transaction.wait();

      console.log(transaction);
      return transaction;
    } catch (err) {
      console.log(err);
      setLoader(false);
      notifyError("Try again later Context");
    }
  };

  //REWARD USER TOKEN
  const rewardToken = async (amount) => {
    try {
      setLoader(true);

      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const toeknDetails = await contract.getTokenDetails();
      const avalableToken = ethers.utils.formatEther(
        toeknDetails.balance.toString()
      );

      if (avalableToken > 1) {
        const transaction = await contract.tokenReward(Number(amount), {
          //gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        console.log(transaction);

        return transaction;
      }
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  return (
    <MusicNFTContext.Provider
      value={{
        createMusicNFT,
        fetchMusicNFT,
        musicICO,
        buyToken,
        transferEther,
        transferToOwnerAcc,
        rewardToken,
        rewardLock,
        REWARD_TOKEN,
        musicNFT_Address,
        currency,
        network,
        OWNER_ADDRESS,
        VERIFY_AMOUNT,
        CREDIT_AMOUNT,
        loader,
        setLoader,
      }}
    >
      {children}
    </MusicNFTContext.Provider>
  );
};
