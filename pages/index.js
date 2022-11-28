import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { web3Context } from "../context/context";

const index = () => {
  const router = useRouter();

  const { connectWallet, account, balance } = useContext(web3Context);
  return (
    <div className="h-screen w-screen flex bg-[#2d2d2d] text-white ">
      <div className="w-9/12 mx-auto">
        <Navbar
          connectWallet={connectWallet}
          account={account}
          balance={balance}
        />

        <div className="text-5xl text-center font-bold text-orange-700 my-16">
          Welcome to Sophomore Track/Course Thanks LearnWeb3DAO !
        </div>

        <div className="mt-36 grid grid-cols-2 md:grid-cols-4 gap-12 ">
          <div
            onClick={() => router.push("/whitelist")}
            className="bg-white text-orange-700 font-semibold text-xl px-6 py-3 hover:bg-slate-500 ease-in-out text-center hover:scale-90 transition-all transform duration-300 rounded-full cursor-pointer"
          >
            Whitelist Dapp
          </div>

          <div
            onClick={() => router.push("/whitelist")}
            className="bg-white text-orange-700 text-center font-semibold text-xl px-6 py-3 hover:bg-slate-500 ease-in-out hover:scale-90 transition-all transform duration-300 rounded-full cursor-pointer"
          >
            Whitelist Dapp
          </div>

          <div
            onClick={() => router.push("/whitelist")}
            className="bg-white text-orange-700 text-center font-semibold cursor-pointer text-xl px-6 py-3 hover:bg-slate-500 ease-in-out hover:scale-90 transition-all transform duration-300 rounded-full"
          >
            Whitelist Dapp
          </div>

          <div
            onClick={() => router.push("/whitelist")}
            className="bg-white text-orange-700 text-center cursor-pointer font-semibold text-xl px-6 py-3 hover:bg-slate-500 ease-in-out hover:scale-90 transition-all transform duration-300 rounded-full"
          >
            Whitelist Dapp
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
