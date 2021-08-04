import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ABIERC721 from "./untils/abiToken.json";
const Web3 = require("web3");
let web3 = new Web3(
  Web3.givenProvider ||
    "https://rinkeby.infura.io/v3/1c37394c71d748369948038cfbc3e79"
);
const dateSaleEnd = 1628045829534 + 30 * 3600 * 24 * 1000;
function App() {
  const [isBuy, setIsBuy] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [badieSupply, setBadieSupply] = useState(0);
  const [dateSale, setDateSale] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  useEffect(() => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          window.ethereum.enable().then(async function async() {
            const account = await web3.eth.getAccounts();
            console.log("account", account);
            actionSmartConstract(account[0]);
          });
        } catch (e) {
          // User has denied account access to DApp...
        }
      }
      // Legacy DApp Browsers
      else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        console.log("web3", web3);
      }
      // Non-DApp Browsers
      else {
        alert("You have to install MetaMask !");
      }
    });
  }, []);

  const actionSmartConstract = async (senderAddress) => {
    console.log("ABIERC721", ABIERC721);
    const ercConstract = new web3.eth.Contract(
      ABIERC721,
      "0x6590D6f9B8120aa30C36b9DF38CAAf7cA51175Dc"
    );
    console.log(
      "process.env.ercConstract",
      process.env.REACT_APP_CONSTRACT_ADDRESS
    );
    const price = await ercConstract.methods.getPrice().call({
      from: senderAddress,
    });
    const saleActive = await ercConstract.methods.saleActive().call({
      from: senderAddress,
    });
    if (saleActive === true) {
      setIsBuy(true);
    }
    //badieSupply  //badieSupply
    const totalSupply = await ercConstract.methods.totalSupply().call({
      from: senderAddress,
    });
    setTotalSupply(totalSupply);
    const badieSupply = await ercConstract.methods.totalSupply().call({
      from: senderAddress,
    });
    setBadieSupply(badieSupply);
    const tokenId = await ercConstract.methods.tokenURI(2).call({
      from: senderAddress,
    });
    const tokenIndex = await ercConstract.methods.tokenByIndex(1).call({
      from: senderAddress,
    });
    console.log("badieSupply", badieSupply);
    console.log("tokenId", tokenId);
    console.log("tokenIndex", tokenIndex);
    const d1 = new Date();
    const d2 = new Date(dateSaleEnd);
    console.log(new Date().getTime());
    console.log("d1", d1);
    console.log("d2", d2);
    console.log("d1.getTime() <= d2.getTime()", d1.getTime() <= d2.getTime());
    if (d1.getTime() <= d2.getTime()) {
      setDateSale(true);
    }
    setLoading(false);
  };

  const onBuyToken = async () => {
    if (window.ethereum) {
      const ercConstract = new web3.eth.Contract(
        ABIERC721,
        "0x6590D6f9B8120aa30C36b9DF38CAAf7cA51175Dc"
      );
      const account = await web3.eth.getAccounts();
      console.log("account", account);
      const buyToken = await ercConstract.methods
        .mintBadie(15)
        .send({ from: account[0] })
        .catch((error) => {
          setMessage("");
        });
      console.log("buyToken", buyToken);
    }
  };

  if (loading) {
    return <WrapperStyled>Loading....</WrapperStyled>;
  }
  if (isBuy) {
    return (
      <WrapperStyled>
        {totalSupply > badieSupply ? (
          <ButtonStyleed>Sold Out</ButtonStyleed>
        ) : (
          <ButtonBuyStyled onClick={onBuyToken}>BUY NOW</ButtonBuyStyled>
        )}
      </WrapperStyled>
    );
  }
  if (!isBuy) {
    return (
      <WrapperStyled>
        {dateSale ? (
          <ButtonStyleed>Sale Finished</ButtonStyleed>
        ) : (
          <ButtonStyleed>Sale not yet active</ButtonStyleed>
        )}
      </WrapperStyled>
    );
  }
}
const WrapperStyled = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;
const ButtonStyleed = styled.button`
  width: 200px;
  height: 50px;
  background: red;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    background: #333;
  }
`;

const ButtonBuyStyled = styled.button`
  width: 200px;
  height: 50px;
  background: green;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    background: #333;
  }
`;

export default App;
