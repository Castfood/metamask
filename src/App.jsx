import { useState } from "react";
import { ethers } from "ethers";
import FrontendMetamask_abi from "./FrontendMetamask_abi.json";

const App = () => {
  //   const ethers = require("ethers");

  const contractAddresss = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const [value, setValue] = useState(undefined);
  const [address, setAddress] = useState("0x0000");
  const [connectButtonText, setConnectButtonText] = useState(
    "Connect to MetaMask"
  );

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  async function requestAccount() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        accountChangeHandler(accounts[0]);
        setConnectButtonText("Connected to Wallet");
      } catch (error) {
        console.log("error");
      }
    } else {
      alert("absent");
    }
  }

  const accountChangeHandler = (newAccount) => {
    try {
      setAddress(newAccount);
      updateEther();
    } catch (error) {
      console.log("error");
    }
  };

  const updateEther = () => {
    try {
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);

      let tempSigner = tempProvider.getSigner();
      setSigner(tempSigner);

      let tempContract = new ethers.Contract(
        contractAddresss,
        FrontendMetamask_abi,
        tempSigner
      );
      setContract(tempContract);
    } catch (error) {
      console.log(error);
    }
  };

  const setNum = async () => {
    try {
      contract.setNumbers(
        document.getElementById("a").value,
        document.getElementById("b").value
      );
    } catch (error) {
      console.log(error);
    }
  };

  const multiply = async () => {
    try {
      let s = await contract.multiply();
      setValue(s.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const power = async () => {
    try {
      let d = await contract.power();
      setValue(d.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Connect MetaMask </h1>
      <h2>Address : {address}</h2>

      <button onClick={requestAccount}>{connectButtonText}</button>

      <br />
      <br />

      <input type="number" id="a" />
      <input type="number" id="b" />
      <button onClick={setNum}>Set</button>
      <br />
      <br />
      <button onClick={multiply}>multiply</button>
      <button onClick={power}>power</button>

      <p>Answer: {value}</p>

      
    </div>
  );
};

export default App;
