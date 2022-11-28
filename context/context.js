import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await provider.send("eth_requestAccounts", []);
      const accounts = await provider.listAccounts();
      const account = accounts[0];
      setAccount(account);

      const amount = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(amount));
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!account) {
        console.log("no account connected");
      } else {
        console.log("account connected : ", account);
        ethereum.on("accountsChanged", (accounts) => {
          setAccount(accounts[0]);
        });

        ethereum.on("balanceChanged", (balance) => {
          setBalance(balance);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    connectWallet();
  });
  return (
    <web3Context.Provider value={{ connectWallet, account, balance }}>
      {children}
    </web3Context.Provider>
  );
};
