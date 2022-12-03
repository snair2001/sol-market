import "bootstrap/dist/css/bootstrap.min.css"
import NFT from "./NFT";
import css from "../styles/NFT.module.css"
import { Button } from "react-bootstrap";
import { useState } from "react";
import { ContractExecuteTransaction, Hbar, ContractFunctionParameters, } from "@hashgraph/sdk"
import { BladeSigner, HederaNetwork } from "@bladelabs/blade-web3.js"


function App() {

  const [activeAcc, setactiveAcc] = useState(null)
  let paths = []

  for (let i = 1; i <= 5; i++) {
    paths.push(require(`../images/${i}.png`))
  }
  const bladeSigner = new BladeSigner();


  async function buy() {
    try {
      let contractBuyTx = new ContractExecuteTransaction()
        .setContractId("0.0.49013954")
        .setGas(10000000)
        .setFunction("buy", new ContractFunctionParameters().addUint8(1))
        .setPayableAmount(new Hbar(1))

      await bladeSigner.call(contractBuyTx)
      return true;
    }
    catch {
      return false;
    }
  }

  async function connectWallet() {
    const params = {
      network: HederaNetwork.Testnet,
      dAppCode: "Nft wallet"
    }
    await bladeSigner.createSession(params);
    let accId = bladeSigner.getAccountId();
    setactiveAcc(accId.toString())
  }


  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-between", }}>

        <h1 style={{ textAlign: "center", paddingTop: "1rem" }}>The NFT marketplace</h1>
        {
          activeAcc == null ?
            <Button style={{ margin: "1rem" }} onClick={connectWallet}>Connect Wallet</Button>
            :
            <div style={{ fontSize: "larger", margin: "1rem", backgroundColor: "rgba(0, 0, 0, 0.488)", minHeight: "3rem", minWidth: "20rem", display: "flex", alignItems: "center", justifyContent: "center", color: "black" }}>
              Account ID :<span>{activeAcc}</span>
            </div>
        }
      </div>
      <div className={css.wrapper}>
        {
          paths.map((img, i) => {
            return <NFT src={img} buy={buy} key={i} />
          })
        }
      </div>

    </div>
  );
}

export default App;
