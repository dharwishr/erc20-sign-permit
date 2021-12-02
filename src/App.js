import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import { signDaiPermit, signERC2612Permit } from "eth-permit";
import { keccak256 } from "@ethersproject/keccak256";
import { defaultAbiCoder } from "@ethersproject/abi";
import { toUtf8Bytes } from "@ethersproject/strings";
import { solidityPack } from "ethers/lib/utils";
import { ecrecover, ecsign } from "ethereumjs-util";
import TestPermit from "./artifacts/contracts/TestPermit.sol/TestPermit.json";
// const fs = require("fs");
// const privateKey = fs.readFileSync(".secrets/.secret").toString().trim();
const privateKey = "45553064b1ce64a8d1ec0bbbc94a32e0ca25b1d8e3c3af1d01c5980d377f9f00"

function App()  {

  const [user, setUser] = useState("");
  const [message, setMessage] = useState("Not Connected");
  const tokenAddress = "0x213547fCDb378D1ee199Ec5443B04F070B4415EA"
  const connect = async () => {
    console.log("connect");
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setUser(await signer.getAddress());
    setMessage("Wallet Connected");
  };

  const signPermit = async () =>{
    // let wei = ethers.utils.bigNumberify("4200000000000000000");
    // let value = ethers.utils.formatEther(wei);
    const value = Web3.utils.toWei('10000', 'ether');

    if(user){
      const senderAddress = user;
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      // const wallet = new ethers.Wallet(privateKey, new ethers.providers.Web3Provider(window.ethereum, "any"));
      const spender = "0x76f2e7c55CcC64B634c4698Ce13932fc5a478075";
      const contract = new ethers.Contract(tokenAddress, TestPermit.abi , signer);
      const result = await signERC2612Permit(signer, tokenAddress, senderAddress, spender, value);
      console.log(result);
      await contract.TestERC20Permit(senderAddress, spender, value, result.deadline, result.v, result.r, result.s);
    }

  }





  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-5">
      <div className="flex justify-center items-center space-x-5">
        <button
          className="bg-blue-500 text-white px-5 py-1 rounded-xl"
          onClick={connect}
        >
          Connect
        </button>
        <button
          className="bg-blue-500 text-white px-5 py-1 rounded-xl"
          onClick={signPermit}
        >
          Permit
        </button>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default App;