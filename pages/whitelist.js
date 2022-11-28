import React, { useContext, useEffect, useState } from "react";
import { web3Context } from "../context/context";
import Styles from "../styles/whitelist.module.css";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import logo from "./crypto-devs.svg";
import { whitelistAbi, whitelistAddress } from "../config";

const whitelist = () => {
  const { account, balance } = useContext(web3Context);
  const [numOfWhitelisted, setNumOfWhitelisted] = useState(0);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [loading, setLoading] = useState(false);

  const addAddressToWhitelist = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const whitelistContract = new ethers.Contract(
        whitelistAddress,
        whitelistAbi,
        signer
      );
      const tx = await whitelistContract.addAddressToWhitelist();
      console.log("trnsaction going through , Please wait");
      setLoading(true);
      await tx.wait();
      setLoading(false);
      console.log("Transaction successful");
      await getNumOfWhitelisted();
    } catch (error) {
      console.log(error);
    }
  };

  const getNumOfWhitelisted = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const whitelistContract = new ethers.Contract(
        whitelistAddress,
        whitelistAbi,
        provider
      );
      const _numOfWhitelisted = await whitelistContract.numAddressWhitelisted();
      setNumOfWhitelisted(_numOfWhitelisted);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfAddressIsWhitelisted = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const whitelistContract = new ethers.Contract(
        whitelistAddress,
        whitelistAbi,
        provider
      );
      const joined = await whitelistContract.whitelistedAddresses(account);
      console.log(joined);
      setJoinedWhitelist(joined);
    } catch (error) {
      console.log(error);
    }
  };

  const renderButton = () => {
    if (account) {
      if (!joinedWhitelist) {
        return (
          <button className={Styles.description} disabled>
            Joined Whitelist Already !
          </button>
        );
      } else if (loading) {
        return (
          <button className={Styles.button} disabled>
            Adding to Whitelist !.....
          </button>
        );
      } else {
        return (
          <button className={Styles.button} onClick={addAddressToWhitelist}>
            Join Whitelist
          </button>
        );
      }
    }
  };

  useEffect(() => {
    getNumOfWhitelisted();
  });

  return (
    <div>
      <Head>
        <title>Whitelist dapp</title>
      </Head>

      <div className={Styles.main}>
        <div>
          <div className={Styles.title}>Welcome to Crypto Devs!</div>
          <div className={Styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={Styles.description}>
            {numOfWhitelisted} have already joined the whitelist.
          </div>
          {renderButton()}
        </div>

        <div>
          <Image src={logo} className={Styles.image} width={500} height={500} />
        </div>
      </div>

      <footer className={Styles.footer}>
        Made with &#10084; by HARSH BARDHAN
      </footer>
    </div>
  );
};

export default whitelist;
