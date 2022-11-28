import React from "react";

const Navbar = ({ connectWallet, account, balance }) => {
  return (
    <div className="m-8 flex justify-between w-full items-center">
      <div>
        <img
          src="https://singaporeblockchain.org/wp-content/uploads/2022/08/TAKI_coin_logo_dark-14x.png"
          className="bg-transparent h-24 w-24"
        />
      </div>

      {account ? (
        <div className="flex gap-20">
          <div className="px-6 py-2 items-center justify-center rounded-3xl text-xl bg-slate-500">
            {balance} Goerli Ether
          </div>
          <div className="px-6 py-2 items-center justify-center rounded-3xl text-xl bg-slate-500">
            {account.slice(0, 8)}...{account.slice(-8, account.length)}
          </div>
        </div>
      ) : (
        <div
          className="px-6 py-2 items-center justify-center rounded-3xl text-xl bg-slate-500"
          onClick={connectWallet}
        >
          Connect Wallet
        </div>
      )}
    </div>
  );
};

export default Navbar;
