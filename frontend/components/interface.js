import { useState } from "react";
import $u from "../utils/$u.js";
import { ethers } from "ethers";

const Interface = () => {
    const [ account, updateAccount] = useState(null);

    const connectMetaMask = async () => {
        try {
            if(!window.ethereum) {
                alert("Install Metamask");
                throw "no-metamask";
            }

            var accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
            var chainId = window.ethereum.networkVersion;
            var activeAccount = account[0];
            var balance = await window.ethereum.request({ method: "eth_getBalance", params: [activeAccount, "latest"]});

            balance = $u.moveDecimalLeft(ethers.BigNumber.from(balance).toSting(), 18);

            var newAccountState = {
                chainId: chainId,
                address: activeAccount,
                balance: balance
            };
            updateAccount(newAccountState);

        } catch(e) {
            console.log(e);
        }
    };

    return (
        <div>
            {
                !! account ? (
                    <div>
                        <p>ChainId: {account.chainId}</p>
                        <p>Wallet address: {account.address}</p>
                        <p>Balance: {account.balance} ETH</p>
                    </div>
                ):
                (
                <button onClick={connectMetaMask}>Connect Metamask</button>
                )
            }
        </div>
    );
};

export default Interface;